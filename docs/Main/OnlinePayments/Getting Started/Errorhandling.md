---
sidebar_position: 3
---

This guide will show you how to handle and resolve errors that occur during a transaction to ensure payments remain dependable and secure. 


## Error Observer

Error management is crucial in the context of the Pay Theory SDK for guaranteeing a seamless and error-free payment processing experience. 

:::info Error Observer
View more details on errorObserver functionality
<a href= "../../../tutorial-extras/WEB/EVENT_LISTENERS#errorobserver" class="button button--primary button--lg">View ErrorObserver</a>
:::

You can return a number of errors from the SDK. They can be returned to the errorObserver or potentially in a response of type ERROR from a function call.
Below is a list of errors that can be returned from the SDK.

|CODE                          |DESCRIPTION                                                               |
--------------------------------|-------------------------------------------------------------------------------|
| ACTION_COMPLETE         | Indicates that an action has been successfully completed and cannot be run again. The fields must be cleared and mounted again. |
| ACTION_IN_PROGRESS      | Indicates that an action is currently in progress. The action cannot be run again until the current action is complete.         |
| CANCEL_FAILED           | Indicates that a cancellation operation failed.                                                                                 |
| FIELD_ERROR             | Indicates an error with mounting the PayTheory Fields.                                                                          |
| INVALID_PARAM           | Indicates that an invalid parameter was provided.                                                                               |
| NO_FIELDS               | Indicates that no fields were found on the DOM to mount.                                                                        |
| NO_TOKEN                | Indicates that no session token was found. This is typically indicative of a network failure.                                   |
| NOT_READY               | Indicates that the SDK is not yet connected and ready to perform the action of a function.                                      |
| NOT_VALID               | Indicates that the transacting field is not valid at the time of running the function.                                          |
| SESSION_EXPIRED         | Indicates that the socket session has expired.                                                                                  |
| SOCKET_ERROR            | Indicates an error with the call to the socket.                                                                                 |
| TRANSACTING_FIELD_ERROR | Indicates either multiple transacting fields or no transacting fields were found visible on the DOM when running a function.    |

```jsx
window.paytheory.errorObserver(error => {
  if (error.startsWith("FIELD_ERROR")) {
    // Logic to handle field-related errors
    console.log("There was an issue with fields on the DOM when mounting.");
    // Additional code specific to field errors
  } else if (error.startsWith("NO_TOKEN")) {
    // Logic to handle auth token fetching errors
    console.log("There was an error fetching the auth token when initializing the SDK.");
    // Additional code specific to auth token errors
  }});

```
