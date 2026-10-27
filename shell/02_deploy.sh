#!/usr/bin/env bash

PARTNER=$1
STAGE=$2
SERVICE_TYPE=$3
SERVICE_NAME=$4
TARGET_MODE=$5

S3_ARTIFACTS_BUCKET="partner-services-deployment-${PARTNER}-${TARGET_ACCOUNT_ID}-${TARGET_REGION}"
S3_ARTIFACTS_PATH="code/${SERVICE_NAME}-${PARTNER}-${STAGE}"

echo "Printing Local scope variables";
echo "PARTNER :: $PARTNER"
echo "STAGE :: $STAGE"
echo "SERVICE_NAME :: $SERVICE_NAME"
echo "SERVICE_TYPE :: $SERVICE_TYPE"
echo "TARGET_MODE :: $TARGET_MODE"
echo "S3_ARTIFACTS_BUCKET :: $S3_ARTIFACTS_BUCKET"
echo "S3_ARTIFACTS_PATH :: $S3_ARTIFACTS_PATH"

# formation.yml gets the edge function's code inlined at deploy time.
FORMATION_TEMPLATE=$(mktemp -t formation.XXXXXX)
node scripts/render-formation-template.js "${FORMATION_TEMPLATE}" || exit 1

echo "Validating the cfn templates $(date) in $(pwd)" ;
aws cloudformation validate-template --template-body "file://${FORMATION_TEMPLATE}" || exit 1
aws cloudformation validate-template --region us-east-1 --template-body file://templates/distribution.yml || exit 1

SITE_S3_PATH="s3://${SERVICE_NAME}-${TARGET_ACCOUNT_ID}-${PARTNER}-${STAGE}/${STAGE}/${PARTNER}"
aws s3 cp build "${SITE_S3_PATH}" --recursive --cache-control max-age=3 --exclude '*.graphql' || exit 1
# S3 has no MIME type for .graphql; serve the schema as readable text.
aws s3 cp build "${SITE_S3_PATH}" --recursive --cache-control max-age=3 --exclude '*' --include '*.graphql' --content-type 'text/plain; charset=utf-8' || exit 1


echo "Deploying certificates and hosted zone resources"
aws cloudformation deploy --template-file ./templates/distribution.yml \
--stack-name "${SERVICE_NAME}"-distribution-"${PARTNER}"-"${STAGE}" \
--region "us-east-1" \
--capabilities CAPABILITY_NAMED_IAM \
--no-fail-on-empty-changeset \
--parameter-overrides \
Partner="${PARTNER}" \
Stage="${STAGE}" \
TargetMode="${TARGET_MODE}"

# Check the status of cloudformation stack set
STATUS=$(aws cloudformation describe-stacks --region "us-east-1" --stack-name "${SERVICE_NAME}"-distribution-"${PARTNER}"-"${STAGE}" --output text --query "Stacks[0].StackStatus")
if [ "$STATUS" = "CREATE_COMPLETE" ]; then
  echo "The cloudformation stack set has been created successfully"
elif [ "$STATUS" = "UPDATE_COMPLETE" ]; then
  echo "The cloudformation stack set has been updated successfully"
elif [ "$STATUS" = "UPDATE_IN_PROGRESS" ]; then
  echo "The cloudformation stack set is currently being updated"
else
  echo "The cloudformation stack failed to complete"
  exit 1
fi

echo "Retrieving hosted zone" ;
HOSTED_ZONE=$(aws --region="us-east-1" ssm get-parameters --name "${SERVICE_NAME}-${PARTNER}-${STAGE}-hosted-zone" --output text --query "Parameters[0].Value")
echo "Retrieving certificate" ;
CERTIFICATE_ARN=$(aws --region="us-east-1" ssm get-parameters --name "${SERVICE_NAME}-${PARTNER}-${STAGE}-certificate-arn" --output text --query "Parameters[0].Value")
echo "Retrieving edge routes key value store" ;
EDGE_ROUTES_KVS_ARN=$(aws --region="us-east-1" ssm get-parameters --name "${SERVICE_NAME}-${PARTNER}-${STAGE}-edge-routes-kvs-arn" --output text --query "Parameters[0].Value")

if [[ ${EDGE_ROUTES_KVS_ARN} != *":key-value-store/"* ]]
then
    echo "Failed to retrieve edge routes key value store ARN!"
    exit 1
fi

echo "Retrieving edge routes sync role" ;
EDGE_ROUTES_SYNC_ROLE_ARN=$(aws --region="us-east-1" ssm get-parameters --name "${SERVICE_NAME}-${PARTNER}-${STAGE}-edge-routes-sync-role-arn" --output text --query "Parameters[0].Value")
# A new role can take a few seconds to become assumable.
for ATTEMPT in 1 2 3 4 5 6; do
  read -r SYNC_KEY_ID SYNC_SECRET SYNC_TOKEN <<< "$(aws sts assume-role --role-arn "${EDGE_ROUTES_SYNC_ROLE_ARN}" --role-session-name edge-routes-sync --output text --query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]")"
  [ -n "${SYNC_TOKEN}" ] && break
  echo "Sync role not assumable yet (attempt ${ATTEMPT}), retrying in 10s"
  sleep 10
done
if [ -z "${SYNC_TOKEN}" ]
then
    echo "Failed to assume edge routes sync role!"
    exit 1
fi

# Runs after the S3 upload, so every route in the store already has its pages.
# Only this command uses the sync role's credentials.
echo "Syncing edge routes" ;
AWS_ACCESS_KEY_ID="${SYNC_KEY_ID}" AWS_SECRET_ACCESS_KEY="${SYNC_SECRET}" AWS_SESSION_TOKEN="${SYNC_TOKEN}" \
node scripts/sync-edge-routes.js "${EDGE_ROUTES_KVS_ARN}" || exit 1

aws cloudformation deploy --template-file "${FORMATION_TEMPLATE}" \
--stack-name "${SERVICE_NAME}"-"${PARTNER}"-"${STAGE}" \
--region "${TARGET_REGION}" \
--capabilities CAPABILITY_NAMED_IAM \
--no-fail-on-empty-changeset \
--parameter-overrides \
Partner="${PARTNER}" \
Stage="${STAGE}" \
TargetMode="${TARGET_MODE}" \
HostedZone="${HOSTED_ZONE}" \
CertificateArn="${CERTIFICATE_ARN}" \
EdgeRoutesKvsArn="${EDGE_ROUTES_KVS_ARN}"

# Check the status of cloudformation stack set
STATUS=$(aws cloudformation describe-stacks --stack-name "${SERVICE_NAME}"-"${PARTNER}"-"${STAGE}" --output text --query "Stacks[0].StackStatus")
if [ "$STATUS" = "CREATE_COMPLETE" ]; then
  echo "The cloudformation stack set has been created successfully"
elif [ "$STATUS" = "UPDATE_COMPLETE" ]; then
  echo "The cloudformation stack set has been updated successfully"
elif [ "$STATUS" = "UPDATE_IN_PROGRESS" ]; then
  echo "The cloudformation stack set is currently being updated"
else
  echo "The cloudformation stack failed to complete"
  exit 1
fi

echo "Retrieving cloudwatch kms key" ;
KMS_KEY_ID=$(aws --region="${TARGET_REGION}" ssm get-parameters --name pt-keys-"${PARTNER}"-cloudwatch-sym-key --output text --query "Parameters[0].Value")
if [[ ${KMS_KEY_ID} != *"arn"* ]]
then
    echo "Failed to retrieve cloudwatch kms key!"
    exit 1
else
    echo "Cloudwatch kms key retrieved..."
fi

# Define the log groups
CODEBUILD_LOG_GROUP_NAME="/aws/codebuild/cb-${SERVICE_NAME}-${PARTNER}-${STAGE}"

# Check if the log group exists
GET_CODEBUILD_LOG_RESPONSE=$(aws --region="${TARGET_REGION}" logs describe-log-groups --log-group-name-prefix "${CODEBUILD_LOG_GROUP_NAME}" --query 'logGroups[?logGroupName==`'"${CODEBUILD_LOG_GROUP_NAME}"'`].logGroupName' --output text)

if [[ ${GET_CODEBUILD_LOG_RESPONSE} != *"/aws/"* ]]
then
    echo "Log group does not exist!"
else
    echo "Log group exists, associating kms key... "
    aws logs --region="${TARGET_REGION}" associate-kms-key --log-group-name "${CODEBUILD_LOG_GROUP_NAME}" --kms-key-id "${KMS_KEY_ID}"
fi


# ##################### GIT Recreation of branch ############################

# if [[ $TARGET_MODE = "standard" ]]
# then
#     MODE=""
# else
#     MODE=$TARGET_MODE
# fi

# # if we do not have the branch in remote create it
# existed_in_remote=$(git ls-remote --heads origin "${PARTNER}""${MODE}"-"${STAGE}" 2>/dev/null)
# if [[ -z ${existed_in_remote} ]]
# then
#     git fetch -p
#     echo "Recreating branch ${PARTNER}${MODE}-${STAGE} from current branch"
#     git checkout -b "${PARTNER}""${MODE}"-"${STAGE}"
#     git push -u origin "${PARTNER}""${MODE}"-"${STAGE}"
# #end if we do not have the branch in remote create it
# fi

# ##########################################################################
