# Transaction

> Part of PayTheory GraphQL API

---

## Operations

| Operation | Type | Description |
| --- | --- | --- |
| [transactions](https://docs.paytheory.com/docs/api/transaction/transactions) | Query | Returns transactions. |
| [createTransaction](https://docs.paytheory.com/docs/api/transaction/create-transaction) | Mutation | Creates transaction. |
| [createWalletTransaction](https://docs.paytheory.com/docs/api/transaction/create-wallet-transaction) | Mutation | This call is used to create a transaction for a wallet payment via Apple Pay or Google Pay. |
| [createReversal](https://docs.paytheory.com/docs/api/transaction/create-reversal) | Mutation | This call will create a refund or a void for a transaction. |
| [serviceFee](https://docs.paytheory.com/docs/api/transaction/service-fee) | Query | This call will allow you to calculate what the fee amount should be if using SERVICE_FEE for a transaction. |
| [createReceiptEmail](https://docs.paytheory.com/docs/api/transaction/create-receipt-email) | Mutation | This call will send a receipt for a transaction to the email address on file with the payor or an email passed in. |
| [updateTransactionInReview](https://docs.paytheory.com/docs/api/transaction/update-transaction-in-review) | Mutation | This call can be used by a partner to approve or decline a transcation that is in review for reason POTEENTIAL_DUPLICATE. |

## Detailed Documentation

For full operation details including arguments, return types, and examples:

- [transactions](https://docs.paytheory.com/llm-docs/transaction/transactions.md)
- [createTransaction](https://docs.paytheory.com/llm-docs/transaction/create-transaction.md)
- [createWalletTransaction](https://docs.paytheory.com/llm-docs/transaction/create-wallet-transaction.md)
- [createReversal](https://docs.paytheory.com/llm-docs/transaction/create-reversal.md)
- [serviceFee](https://docs.paytheory.com/llm-docs/transaction/service-fee.md)
- [createReceiptEmail](https://docs.paytheory.com/llm-docs/transaction/create-receipt-email.md)
- [updateTransactionInReview](https://docs.paytheory.com/llm-docs/transaction/update-transaction-in-review.md)