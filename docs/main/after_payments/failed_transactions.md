---
sidebar_position: 7
sidebar_label: 'Failure Codes'
title: "Failure Codes"
---

# Failed Transactions
When a transaction fails you will be returned a transaction with a status of `FAILURE`. In the SDK you will also receive a `reason` object with a `failure_code` and `failure_text` that will give you more information about the failure.

The `failure_text` will be a sentence explaining the Failure and is the better option to be displayed to the user without modification.

The `failure_code` is a string that you can use if you would rather display your own error message.

If you are calling the [createTransaction](/docs/api/transaction/create-transaction) endpoint you will receive a response and the `failure_code` will be the `failure_reason` in the response.

The failure codes are listed below.

| CODE | DESCRIPTION |
| --- | --- |
| ACCOUNT_VALIDATION_FAILURE | Bank Account failed account validation. Please review the account details and try again. |
| ACH_INVALID | The ACH details provided are invalid. The bank account holder needs to provide valid account details. |
| ACH_MAX_TRANSACTION_AMOUNT_EXCEEDED | The ACH transaction was declined because it exceeded the max ACH transaction amount that's associated with the Merchant . The ACH transaction needs to be recreated with a lower amount. |
| ADDRESS_VERIFICATION_AND_CVV_FAILED_RISK_RULES | The Risk Profile associated with the Merchant declined the transaction because both AVS and CVV failed. The cardholder needs to create a card with the correct address and CVV. |
| ADDRESS_VERIFICATION_FAILED_RISK_RULES | The Risk Rules associated to the Merchant declined the transaction. The cardholder needs to attempt the transaction again using the correct address. |
| AUTHORIZATION_EXPIRED_OR_ALREADY_CAPTURED | The authorization is either expired or has already been captured. A new authorization needs to be created. |
| BANK_ACCOUNT_CLOSED | The bank account has been closed. Contact the account owner and get another method of payment that's active. |
| BANK_ACCOUNT_FROZEN | The bank account is frozen. Contact the account owner and get another method of payment. |
| CALL_ISSUER | The card was declined for an unknown reason. The cardholder needs to contact their card issuer for more information. |
| CARD_ACCOUNT_CLOSED | The card account has been closed. The cardholder should use an active card. |
| CARD_NETWORK_ERROR | There is a problem with the card network. Contact the network for more information. |
| CARD_NOT_ACTIVATED_OR_BLOCKED | The card was declined because it has not been activated or has been temporarily blocked. Please ask the cardholder to activate their card or contact their issuing bank for additional information. |
| CARD_NOT_SUPPORTED | The card does not support this type of purchase. The cardholder needs to contact their issuing bank to make sure their card can be used to make this type of purchase. |
| CARDHOLDER_PREVENTED_RECURRING_TRANSACTION | Cardholder requested that recurring or installment transaction to be stopped. |
| COMMUNICATION_ERROR | There was a network communication error with the host. Check your network connection and retry the transaction. |
| CRYPTOGRAPHIC_ERROR | Supplied PIN or card verification method is incorrect. |
| CVV_FAILED_RISK_RULES | The Risk Rules associated with the Merchant declined the transaction. The cardholder needs to attempt the transaction again using the correct CVV. |
| DEVICE_NOT_CONNECTED | The payment terminal isn't connected to a network. Connect the payment terminal to a network and reattempt the transaction. |
| DEVICE_IN_USE | The device is currently processing a request. Attempt a request again once the request is complete, or within 6 minutes. |
| DO_NOT_HONOR | The card was declined for an unknown reason. The cardholder needs to contact their issuing bank for more information. |
| DUPLICATE_TRANSACTION | A transaction with the same amount and payment method was approved recently and marked as a duplicate. If this duplicate transaction was intentional, contact the processor for support. |
| EXCEEDS_APPROVAL_LIMIT | The authorization exceeds the approval limit. The cardholder needs to contact their card issuer for more information. |
| EXCEEDS_WITHDRAWAL_FREQUENCY_LIMIT | The card has exceeded its withdrawal frequency limit. The cardholder needs to use a different card. |
| EXPIRED_CARD | The card has expired. The cardholder needs to use another card that's not expired. |
| FRAUD_DETECTED | The card was declined for fraud by the processor. The customer should contact their card issuer for more information. |
| GENERIC_DECLINE | The transaction was declined for an unknown reason. The account owner needs to contact their issuer for more information. |
| INACTIVE_CARD | The card is inactive. The cardholder needs to activate the card or use an active card. |
| INCOMPLETE_TRANSACTION | The transaction was not completed by the cardholder. The cardholder needs to reattempt the transaction. |
| INSUFFICIENT_FUNDS | The account has insufficient funds for the transaction. The account holder needs to use another method of payment. |
| INVALID_ACCOUNT_NUMBER | The card number is not valid. The cardholder needs to contact their issuing bank for more information or use another card. |
| INVALID_AMOUNT | The amount exceeds the amount that is allowed on the card. The cardholder needs to check with their issuing bank to see if they can make purchases of that amount. |
| INVALID_BANK_ACCOUNT_NUMBER | The bank account number is not valid. The account holder needs to use a valid account number. |
| INVALID_CARD | The card is invalid. The cardholder needs to use another card that is not invalid. |
| INVALID_CARD_NUMBER_OR_EXPIRED_CARD | The card was declined because the issuing bank indicated that the card number is not valid, closed, or the expiration date is invalid. |
| INVALID_CVV | The CVV number is invalid. The cardholder needs to attempt the transaction again using the correct CVV. |
| INVALID_ISSUER | The card number is not associated to a valid card issuing bank. The cardholder needs to contact their issuing bank. |
| INVALID_ROUTING_NUMBER | The bank routing number provided is invalid. The bank account holder needs to provide a valid routing number. |
| INVALID_TRANSACTION | The transaction is not permitted by the issuing bank. The cardholder needs to contact their issuing bank for more information. |
| LOST_OR_STOLEN_CARD | The transaction was declined for an unknown reason. The account owner needs to contact their issuer for more information. |
| MAX_TRANSACTION_AMOUNT_EXCEEDED | The transaction was declined because it exceeded the max transaction amount that's associated with the Merchant . The transaction needs to be recreated with a lower amount. |
| NO_BANK_ACCOUNT_FOUND | The account number is valid; however, the number doesn't correspond to the account holder or it's not an open account. The account holder needs to reenter their information with the correct details. |
| NON_TRANSACTION_ACCOUNT | This is a non-transaction account that limits or prevents transactions. Contact your customer and request permission to charge a different bank account. |
| PAYMENT_STOPPED | The customer has stopped the payment with their bank. Contact the customer for details and to arrange payment. |
| PICK_UP_CARD | The card has been reported as lost or stolen by the cardholder. The cardholder needs to contact their issuing bank. |
| RESTRICTED_CARD | The card has a restriction preventing approval for this transaction. Please contact the issuing bank for a specific reason. |
| RESUBMIT_TRANSACTION | The transaction couldn't be processed by the issuer for an unknown reason. The cardholder needs to attempt the transaction again. If the transaction is declined again, the cardholder should contact their issuing bank. |
| TRANSACTION_NOT_PERMITTED | The transaction was declined because the card or transaction type is not permitted. The cardholder needs to use a different type of card or attempt a different transaction method. |
| REFER_TO_CARD_ISSUER | Please contact card issuer for more information. |
| INVALID_MERCHANT | Merchant not permitted for this transaction type. |
| PICK_UP_CARD_NO_FRAUD | Please contact card issuer for more information. |
| ERROR | Please attempt transaction again but if it still cannot be processed try again at a later time. |
| PICK_UP_CARD_FRAUD_ACCOUNT | Please contact card issuer for more information. |
| INVALID_AMOUNT_OR_CURRENCY | Transaction violates network amount limit. |
| NO_SUCH_ISSUER | The issuer can not be found. Please check card number to ensure it is valid. |
| RE_ENTER_TRANSACTION | Please attempt transaction again and contact card issuer if it still cannot be processed. |
| NO_ACTION_TAKEN | Please contact card issuer for more information. |
| UNABLE_TO_LOCATE_RECORD | The account number does not exist. Please make sure the account number is correct or contact your issuer. |
| FILE_TEMPORARILY_NOT_AVAILABLE | Please contact card issuer for more information. |
| NO_CREDIT_ACCOUNT | Please contact card issuer for more information. |
| LOST_CARD_PICK_UP_FRAUD_ACCOUNT | Please contact card issuer for more information. |
| STOLEN_CARD_PICK_UP_FRAUD_ACCOUNT | Please contact card issuer for more information. |
| NOT_SUFFICIENT_FUNDS | Card issuer has declined the transaction as it does not have sufficient funds. |
| NO_CHECKING_ACCOUNT | The card is not tied to a checking account and thus cannot be processed. Please try another card. |
| NO_SAVINGS_ACCOUNT | The card is not tied to a savings account and thus cannot be processed. Please try another card. |
| INCORRECT_PIN | The PIN is invalid or missing. Please try again with the correct PIN. |
| SUSPECTED_FRAUD | Please contact card issuer for more information. |
| EXCEEDS_APPROVAL_AMOUNT_LIMIT | Transaction violates issuer amount limit. Please contact card issuer for more information or try with another card. |
| TRANSACTION_DOES_NOT_FULFILL_AML_REQUIREMENT | This transaction does not fulfill compliance requirements and cannot be processed. |
| ALLOWABLE_NUMBER_OF_PIN_ENTRY_TRIES_EXCEEDED | The maximum permitted number of PIN entry attempts has been exceeded. Please use another payment method. |
| CRYPTOGRAPHIC_ERROR_FOUND_IN_PIN | The supplied PIN is invalid. |
| NEGATIVE_RESULTS | Invalid security code. |
| CANNOT_VERIFY_PIN | The PIN is invalid or missing. Please try again with the correct PIN. |
| ISSUER_INOPERATIVE | Please attempt transaction again and contact card issuer if it still cannot be processed. |
| ISSUER_POLICY_VIOLATION | The card was declined because the issuing bank has an internal rule that prevents it. The rule can prohibit certain merchants, issuing countries or other restrictions. Please have the cardholder contact their issuing bank for additional information. |
| FINANCIAL_INSTITUTION_NOT_FOUND | The issuer can not be found. Please check card number to ensure it is valid. |
| TRANSACTION_NOT_COMPLETED_LAW_VIOLATION | The transaction cannot be completed because it violates a law. |
| SURCHARGE_AMOUNT_NOT_SUPPORTED | The supplied surcharge amount is not supported by the issuer. |
| TRANSACTION_AMOUNT_EXCEEDS_PREAUTHORIZED_APPROVAL_AMOUNT | Transaction violates amount limit. |
| CARD_AUTHENTICATION_FAILED | Please contact card issuer for more information. |
| STOP_PAYMENT_ORDER | Please contact card issuer for more information. |
| UNKNOWN_ERROR | There was an error processing the transaction. |
| UNPROCESSABLE_ENTITY | The payment instrument is not valid. |
| TIMEOUT | There was a timeout while performing the transaction request. |
| SYSTEM_ERROR | There was a system error processing the transaction. |
| INVALID_DATA_ERROR | The data provided is invalid. Please check the data and try again. |
