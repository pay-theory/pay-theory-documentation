---
sidebar_position: 4
sidebar_label: 'Error Handling'
title: "SDK Error Handling"
---

# SDK errors

SDK errors are strings that start with a code, such as `NOT_READY: Not all fields are ready to update the amount`. You get the string in two places:

- the [`errorObserver`](event_listeners#errorobserver) callback
- the `error` key of an [`ERROR` response](functions#error-response) from a function

```javascript
const result = await paytheory.transact({ amount: 1000 })

if (result.type === 'ERROR' && result.error.startsWith('NOT_VALID')) {
  // Ask the payor to fix the highlighted fields
}
```

Errors from Pay Theory's servers start with `SOCKET_ERROR`, followed by the server's message. The `errorObserver` also receives field validation messages, which have no code.

| Code | description |
|------|-------------|
| ACTION_COMPLETE | The action already finished and can't run again. Remount the fields to start over. |
| ACTION_IN_PROGRESS | The same action is still running. Wait for it to finish. |
| CANCEL_FAILED | `cancel` couldn't cancel the payment. |
| FIELD_ERROR | The SDK couldn't mount the hosted fields. |
| INVALID_PARAM | A parameter is missing, has the wrong type or conflicts with another parameter. The message names it. |
| NO_FIELDS | The SDK found no hosted field containers on the page. |
| NO_TOKEN | The SDK couldn't get a session token. Usually a network failure. |
| NOT_READY | The SDK isn't connected yet. Wait for [`readyObserver`](event_listeners#readyobserver). |
| NOT_VALID | The transacting fields aren't valid. The payor needs to fix them. |
| SESSION_EXPIRED | The SDK's connection session expired. Arrives inside a `SOCKET_ERROR` message, as `SOCKET_ERROR: SESSION_EXPIRED: ...`. |
| SOCKET_ERROR | Pay Theory's servers returned an error, such as an idempotency key reused with a different request, or a processor rejection. |
| TRANSACTING_FIELD_ERROR | The SDK found more than one set of transacting fields visible on the page, or none. |
