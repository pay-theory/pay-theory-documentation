---
sidebar_position: 2
sidebar_label: 'TypeScript'
title: 'TypeScript'
---

# TypeScript

Pay Theory publishes a TypeScript declaration file, `paytheory-sdk.d.ts`, next to the SDK. It types `window.paytheory`, the input of every function, and every response. The SDK still loads as a browser script, and the file adds types only.

***
## Download the declaration file

The file is on the same host as your SDK Import URL. Replace `index.js` with `paytheory-sdk.d.ts`:

| File | URL |
|------|-----|
| SDK | `https://pt.sdk.paytheory.com/index.js` |
| Declarations | `https://pt.sdk.paytheory.com/paytheory-sdk.d.ts` |

Your SDK Import URL is in the Pay Theory portal under the settings tab. Save the file in your project:

```bash title="terminal"
curl -o src/types/paytheory-sdk.d.ts https://pt.sdk.paytheory.com/paytheory-sdk.d.ts
```

Download it again when the [changelog](../../main/changelog) lists SDK changes, so new parameters and responses show up in your types.

***
## Add it to your project

The file declares `window.paytheory` globally and also exports each type. You can use it either way.

### Use the global types

Add the file to `include` in your `tsconfig.json`:

```json title="tsconfig.json"
{
  "include": ["src/**/*", "src/types/paytheory-sdk.d.ts"]
}
```

Calls through `window.paytheory` are now typed. The file types the `paytheory` property on `window`, not a bare `paytheory` global, so call the SDK as `window.paytheory`.

### Import the types

Import a type wherever you need to name it:

```typescript title="checkout.ts"
import type { TransactProps, TransactResult } from './types/paytheory-sdk';
```

***
## Handle each transact result

Every response has a `type`. Check it and TypeScript narrows `body` to the matching shape:

```typescript title="checkout.ts"
import type { TransactProps, TransactResult } from './types/paytheory-sdk';

const props: TransactProps = {
  amount: 1000,
  payorInfo: {
    first_name: 'Pat',
    last_name: 'Theodore',
    email: 'pat@example.com',
  },
};

const result: TransactResult = await window.paytheory.transact(props);

switch (result.type) {
  case 'SUCCESS':
    console.log('Paid', result.body.payment_method_id);
    break;
  case 'FAILED':
    // The compact body has `reason`. The full body has `failure_reasons`.
    console.log('Declined', 'reason' in result.body ? result.body.reason.failure_text : result.body.failure_reasons);
    break;
  case 'CASH':
    console.log('Barcode', result.body.barcodeUrl);
    break;
  case 'ERROR':
    console.error(result.error);
    break;
}
```

`SUCCESS` and `FAILED` bodies are the compact shape by default and the full [`Transaction`](functions#expanded-responses) when you pass `expandedResponse: true`. Check for a field only the full shape has, such as `transaction_id`, to tell them apart:

```typescript title="checkout.ts"
if (result.type === 'SUCCESS' && 'transaction_id' in result.body) {
  console.log(result.body.transaction_id, result.body.status);
}
```

***
## Main types

| Type | Describes |
|------|-----------|
| `PayTheoryPaymentFieldsInput` | Input to [`payTheoryFields`](functions#paytheoryfields). |
| `TransactProps` | Input to [`transact`](functions#transact). |
| `TransactResult` | Every response `transact` can return. |
| `TokenizeProps` | Input to [`tokenizePaymentMethod`](functions#tokenizepaymentmethod). |
| `TokenizeResult` | Every response `tokenizePaymentMethod` can return. |
| `StateObject` | Payload of [`stateObserver`](event_listeners#stateobserver). Has a `FieldState` for every field key, mounted or not. |
| `Transaction` | Full transaction returned with `expandedResponse: true`. |
| `PaymentMethod` | Full payment method returned with `expandedResponse: true`. |
| `PayTheoryButtonInput` | Input to [`button`](payment_button). |
| `PayTheoryQRInput` | Input to [`qrCode`](payment_qr_code). |
| `CheckoutDetails` | `checkoutDetails` for `button` and `qrCode`. |
| `ErrorType` | Codes an `ERROR` string can start with. See [Error handling](errors). |
| `WalletTransactionPayload` | Input to [`processWalletTransaction`](messenger/processWalletTransaction). |
| `MessengerEventMap` | Payload of each [Messenger event](messenger/on). |
