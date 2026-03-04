# Sandbox

> Part of PayTheory GraphQL API

---

## Operations

| Operation | Type | Description |
| --- | --- | --- |
| [createBarcodePaymentSandbox](https://docs.paytheory.com/docs/api/sandbox/create-barcode-payment-sandbox) | Mutation | Sandbox Only This mutation will only work in sandbox environments. |
| [createBatchCapture](https://docs.paytheory.com/docs/api/sandbox/create-batch-capture) | Mutation | This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant. |
| [createSandboxAchReturn](https://docs.paytheory.com/docs/api/sandbox/create-sandbox-ach-return) | Mutation | Use this mutation to create an ACH return for a completed ACH transaction. |
| [createSandboxDispute](https://docs.paytheory.com/docs/api/sandbox/create-sandbox-dispute) | Mutation | Use this mutation to create a dispute for a card transaction. |
| [createSandboxSettlement](https://docs.paytheory.com/docs/api/sandbox/create-sandbox-settlement) | Mutation | Create a settlement from a prepared sandbox batch. |
| [prepareSandboxSettlementBatch](https://docs.paytheory.com/docs/api/sandbox/prepare-sandbox-settlement-batch) | Mutation | Prepare a settlement batch to lock in line items and calculate totals for a merchant. |
| [updateSandboxDisputeStatus](https://docs.paytheory.com/docs/api/sandbox/update-sandbox-dispute-status) | Mutation | Use this mutation to move a dispute through its lifecycle. |

## Detailed Documentation

For full operation details including arguments, return types, and examples:

- [createBarcodePaymentSandbox](https://docs.paytheory.com/llm-docs/sandbox/create-barcode-payment-sandbox.md)
- [createBatchCapture](https://docs.paytheory.com/llm-docs/sandbox/create-batch-capture.md)
- [createSandboxAchReturn](https://docs.paytheory.com/llm-docs/sandbox/create-sandbox-ach-return.md)
- [createSandboxDispute](https://docs.paytheory.com/llm-docs/sandbox/create-sandbox-dispute.md)
- [createSandboxSettlement](https://docs.paytheory.com/llm-docs/sandbox/create-sandbox-settlement.md)
- [prepareSandboxSettlementBatch](https://docs.paytheory.com/llm-docs/sandbox/prepare-sandbox-settlement-batch.md)
- [updateSandboxDisputeStatus](https://docs.paytheory.com/llm-docs/sandbox/update-sandbox-dispute-status.md)