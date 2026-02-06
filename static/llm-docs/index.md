# GraphQL API - GraphQL API Reference

**Operations:** 69 (23 queries, 46 mutations)  
**Groups:** Authorization, Barcode, Deprecated, Disputes, Invoice, Merchant, Metadata, Payment Links, Payment Method Token, Payor, Recurring Payment, Sandbox, Settlement, Settlements, Split, Transaction, Users, Webhooks

---

## Quick Reference

### Queries

| Operation | Group | Description |
| --- | --- | --- |
| `authorizations(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Authorizations` | Authorization | This query will return a list of authorizations for a merchant. |
| `availableFundsBalance(merchant_uid: ID!): [AvailableFundsBalance]` | Settlement | This query returns the instructional hold and reserve balances for a merchant, along with the instruction window status. |
| `barcode(merchant_uid: ID!, barcode_id: String!): Barcode` | Barcode | This can be used to call back a single barcode. |
| `disputes(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Disputes` | Disputes | Returns disputes. |
| `fundingTransfers(merchant_uid: ID!, settlement_batch: Int!): FundingTransfers` | Settlement | Returns funding transfers. |
| `instruction(merchant_uid: ID!, date: AWSDate!): [Instruction]` | Settlement | Returns instruction. |
| `invoices(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Invoices` | Invoice | Returns invoices. |
| `merchant(merchant_uid: String, merchant_name: String): Merchant` | Merchant | Returns merchant. |
| `merchants(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Merchants` | Merchant | Returns merchants. |
| `missedRecurringPaymentData(recurring_id: String!): MissedRecurringPaymentData` | Recurring Payment | This call will return details you need to display the proper amount to the customer to catch up on missed payments for a recurring payment. |
| `paymentLinks(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): PaymentLinks` | Payment Links | Returns payment links. |
| `paymentMethodTokens(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): PaymentMethodTokens` | Payment Method Token | Returns payment method tokens. |
| `payors(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Payors` | Payor | Returns payors. |
| `recurringPayments(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): RecurringPayments` | Recurring Payment | Returns recurring payments. |
| `serviceFee(merchant_uid: String!, amount: Int!, bank_id: String, payment_type: String, is_ach: Boolean, payment_method_id: String): ServiceFeeCalculation!` | Transaction | This call will allow you to calculate what the fee amount should be if using SERVICE_FEE for a transaction. |
| `serviceFeeAmount(merchant_uid: String!, amount: Int!): ServiceFeeAmount` | Deprecated | This call was deprecated in favor of the serviceFee query. |
| `settlements(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Settlements` | Settlement | Returns settlements. |
| `splits(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Splits` | Split | Returns splits. |
| `transactions(query: SqlQuery, limit: Int, offset: String, direction: MoveDirection, offset_id: String): Transactions` | Transaction | Returns transactions. |
| `users(user_pool: UserPool!, merchant_uid: String): [User]` | Users | Returns users. |
| `validatePaymentMethodOwnership(payment_method_id: String!, number: String!): Boolean!` | Payment Method Token | This mutation validates whether a provided card or bank account number matches a specific payment method. |
| `webhookEvents(id: ID, endpoint: String, result: WebhookNotificationResult, last_evaluated_key: String, limit: Int): WebhookEvents!` | Webhooks | Returns webhook events. |
| `webhooks(endpoint: String): [Webhook]!` | Webhooks | Returns webhooks. |

### Mutations

| Operation | Group | Description |
| --- | --- | --- |
| `cancelRecurringPayment(recurring_id: String!): Boolean` | Recurring Payment | Once a recurring payment is cancelled, it cannot be reactivated. |
| `cancelSettlementInstruction(merchant_uid: ID!): Instruction` | Settlements | Cancels settlement instruction. |
| `createAuthorization(merchant_uid: String!, sale_id: String, amount: Int!, payment_method_id: String, payment_method: PaymentMethodInput, invoice_id: String, fee: Int, fee_mode: FeeMode, account_code: String, reference: String, metadata: AWSJSON, health_expense_type: HealthExpenseType, digital_wallet: DigitalWalletInput, additional_purchase_data: AdditionalPurchaseDataInput, one_time_use_token: Boolean): Authorization!` | Authorization | This mutation will create a new authorization for a merchant. |
| `createBarcode(input: BarcodeInput!): Barcode!` | Barcode | This mutation will create a barcode for a payor to use to make a cash payment. |
| `createBarcodePaymentSandbox(barcode_id: String!, amount_to_pay: Int!): BarcodePaymentResponse!` | Barcode | Sandbox Only This mutation will only work in sandbox environments. |
| `createBatchCapture(merchant_uid: String!): Boolean` | Settlement | This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant. |
| `createCapture(merchant_uid: String!, authorization_id: String!, amount: Int!, fee: Int, send_receipt: Boolean, receipt_description: String, allow_reauth: Boolean, allow_exceeded_amount: Boolean, split: [SplitInput]): Transaction!` | Authorization | This mutation will capture an authorization for a merchant. |
| `createInvoice(input: InvoiceInput!): Invoice` | Invoice | Creates an invoice. |
| `createInvoiceEmail(invoice_id: String!): Boolean` | Invoice | This call is used to resend Invoice emails for a specific invoice. |
| `createMerchant(merchant_name: String!, parent_merchant_uid: String, user: MerchantUserInput, metadata: AWSJSON): ListMerchant` | Merchant | Creates merchant. |
| `createOfflineTransaction(input: OfflineTransactionInput!): OfflineTransaction` | Invoice | This call is used to create an offline transaction for an invoice. |
| `createOneTimePayment(merchant_uid: String!, amount: Int!, payment_method_id: String, payment_method: PaymentMethodInput, recurring_id: String, invoice_id: String, fee: Int, fee_mode: FeeMode, payment_parameters_name: String, account_code: String, reference: String, send_receipt: Boolean, receipt_description: String, metadata: AWSJSON, health_expense_type: HealthExpenseType, additional_purchase_data: AdditionalPurchaseDataInput): OneTimePayment` | Deprecated | This call was deprecated in favor of the createTransaction mutation. |
| `createPaymentLink(input: PaymentLinkInput!): PaymentLink` | Payment Links | Creates payment link. |
| `createPaymentMethod(payment_method: PaymentMethodInput!, merchant_uid: String!, skip_validation: Boolean): PaymentMethodToken` | Payment Method Token | This mutation will create a payment method token for a payor. |
| `createPayor(input: PayorInput!): Payor` | Payor | Creates payor. |
| `createReceiptEmail(transaction_id: String!, receipt_description: String, email: AWSEmail): Boolean` | Transaction | This call will send a receipt for a transaction to the email address on file with the payor or an email passed in. |
| `createRecurringPayment(input: RecurringPaymentInput!): RecurringPayment` | Recurring Payment | Creates recurring payment. |
| `createRefund(transaction_id: String!, amount: Int!, refund_reason: RefundReasonInput!, refund_email: String): Boolean` | Deprecated | This call will create a refund for a transaction. |
| `createRetryForFailedRecurringPayment(recurring_id: String!): Boolean` | Recurring Payment | This call will allow you to retry a payment for a recurring payment that is in a Failed state. |
| `createReversal(transaction_id: String!, amount: Int!, refund_reason: RefundReasonInput!, refund_email: String): ReversalResponse!` | Transaction | This call will create a refund or a void for a transaction. |
| `createSandboxAchReturn(input: CreateSandboxAchReturnInput!): SandboxAchReturnResult!` | Sandbox | Use this mutation to create an ACH return for a completed ACH transaction. |
| `createSandboxDispute(input: CreateSandboxDisputeInput!): SandboxDisputeResult!` | Sandbox | Use this mutation to create a dispute for a card transaction. |
| `createSandboxSettlement(input: CreateSandboxSettlementInput!): SandboxSettlementResult!` | Sandbox | Create a settlement from a prepared sandbox batch. |
| `createSettlementInstruction(input: CreateSettlementInstructionInput!): CreateSettlementInstructionResponse` | Settlements | This mutation creates an instructional funding request for a merchant. |
| `createTransaction(merchant_uid: String!, amount: Int!, payment_method_id: String, payment_method: PaymentMethodInput, recurring_id: String, invoice_id: String, fee: Int, fee_mode: FeeMode, account_code: String, reference: String, send_receipt: Boolean, receipt_description: String, metadata: AWSJSON, health_expense_type: HealthExpenseType, digital_wallet: DigitalWalletInput, additional_purchase_data: AdditionalPurchaseDataInput, one_time_use_token: Boolean, split: [SplitInput]): Transaction!` | Transaction | Creates transaction. |
| `createUser(input: UserInput!): User` | Users | Creates user. |
| `createVoidForAuthorization(authorization_id: String!, void_amount: Int): Boolean` | Authorization | This will void an authorization that has not been captured. |
| `createWalletAuthorization(app_id: String, merchant_uid: String!, sale_id: String, wallet_type: WalletType, digital_wallet_payload: String!, amount: Int, fee: Int, billing_address: BillingAddressInput, payor_id: String, payor: PayorInput, invoice_id: String, account_code: String, reference: String, metadata: AWSJSON, health_expense_type: HealthExpenseType, additional_purchase_data: AdditionalPurchaseDataInput): Authorization!` | Authorization | This call is used to create an authorization for a wallet payment via Apple Pay or Google Pay. |
| `createWalletTransaction(app_id: String, merchant_uid: String!, wallet_type: WalletType, digital_wallet_payload: String!, amount: Int, fee: Int, billing_address: BillingAddressInput, payor_id: String, payor: PayorInput, recurring_id: String, invoice_id: String, account_code: String, reference: String, send_receipt: Boolean, receipt_description: String, metadata: AWSJSON, health_expense_type: HealthExpenseType, additional_purchase_data: AdditionalPurchaseDataInput, split: [SplitInput]): Transaction!` | Transaction | This call is used to create a transaction for a wallet payment via Apple Pay or Google Pay. |
| `createWebhook(endpoint: String!, name: String!): Boolean!` | Webhooks | To create a webhook, you need to provide the endpoint and a name for the webhook using the following mutation: |
| `deleteInvoice(invoice_id: String!): Boolean` | Invoice | Deletes an invoice. |
| `deleteMetadata(id: String!, metadata_associate: MetadataAssociate!, merchant_uid: String!, metadata_keys: [String]!): Boolean` | Metadata | Deletes metadata for an item. |
| `deleteUser(username: String!, user_pool: UserPool!): Boolean` | Users | Deletes user. |
| `deleteWebhook(endpoint: String!): Boolean!` | Webhooks | To delete a webhook, you can use the following mutation: |
| `prepareSandboxSettlementBatch(input: PrepareSandboxSettlementBatchInput!): SandboxSettlementBatchPrepResult!` | Sandbox | Prepare a settlement batch to lock in line items and calculate totals for a merchant. |
| `updateFeeMatrix(fee_matrix: FeeMatrixInput!): FeeMatrix` | Merchant | :::note Limited Access This mutation is only available to users with Partner level access. |
| `updateInvoice(invoice_id: String!, invoice_update_input: InvoiceUpdateInput!): Boolean` | Invoice | Updates an invoice. |
| `updateMerchantSettings(merchant_uid: ID!, settings: MerchantSettingsInput!): Boolean` | Merchant | Updates merchant settings. |
| `updateMetadata(id: String!, metadata_associate: MetadataAssociate!, merchant_uid: String!, metadata: AWSJSON!): Boolean` | Metadata | Updates metadata for an item. |
| `updatePaymentLink(input: UpdatePaymentLinkInput!): PaymentLink` | Payment Links | Updates payment link. |
| `updatePaymentMethodToDisabled(merchant_uid: ID!, payment_method_id: String!): Boolean!` | Payment Method Token | This mutation can be used to disable a payment method token. |
| `updatePayor(payor_id: String!, payor_data: PayorData!): Boolean` | Payor | Updates payor. |
| `updateRecurringPayment(input: UpdateRecurringPaymentInput!): RecurringPayment` | Recurring Payment | Updates recurring payment. |
| `updateSandboxDisputeStatus(input: UpdateSandboxDisputeStatusInput!): SandboxDisputeUpdateResult!` | Sandbox | Use this mutation to move a dispute through its lifecycle. |
| `updateTransactionInReview(transaction_id: String!, action: TransactionReviewAction!): Boolean` | Transaction | This call can be used by a partner to approve or decline a transcation that is in review for reason POTEENTIAL_DUPLICATE. |
| `updateWebhook(endpoint: String!, name: String, is_active: Boolean): Boolean!` | Webhooks | To update a webhook, you can use a mutation like the following: |

---

## Documentation Files

For full documentation including type definitions and examples, see:

- [Authorization](./authorization.md)
- [Barcode](./barcode.md)
- [Deprecated](./deprecated.md)
- [Disputes](./disputes.md)
- [Invoice](./invoice.md)
- [Merchant](./merchant.md)
- [Metadata](./metadata.md)
- [Payment Links](./payment-links.md)
- [Payment Method Token](./payment-method-token.md)
- [Payor](./payor.md)
- [Recurring Payment](./recurring-payment.md)
- [Sandbox](./sandbox.md)
- [Settlement](./settlement.md)
- [Settlements](./settlements.md)
- [Split](./split.md)
- [Transaction](./transaction.md)
- [Users](./users.md)
- [Webhooks](./webhooks.md)