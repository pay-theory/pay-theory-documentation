---
sidebar_position: 1
sidebar_label: 'Pay Theory Apple SDK'
title: "Pay Theory Apple SDK"
---
# Pay Theory Apple SDK

This is the Pay Theory Apple SDK. It is a collection of Swift UI inputs and utilities to help you integrate Pay Theory into your app.

This guide will walk you through the basic steps to integrate the PayTheory Swift SDK into your iOS application.

## Step 1: Import the Swift Package

First, you need to add the PayTheory Swift package to your Xcode project:

1. In Xcode, go to File > Add Packages...
2. In the search bar, enter the following URL: `https://github.com/pay-theory/pay-theory-ios`
3. Select the PayTheory package when it appears in the search results.
4. Choose the version or branch you want to use (usually, you'll want the latest version).
5. Click "Add Package" to import it into your project.

## Step 2: Import PayTheory in Your Swift File

In any Swift file where you want to use PayTheory, add the import statement at the top:

```swift
import PayTheory
```

## Step 3: Initialize the PayTheory Object

Now, you can initialize the PayTheory object with your API key. You can do this in your SwiftUI view:

```swift
import SwiftUI
import PayTheory

struct ContentView: View {
    let payTheory = PayTheory(apiKey: "your-api-key-here") { error in
        print("Error: \(error.error)")
    }

    // ... rest of your view code
}
```

## Step 4: Wrap Your View with PTForm

Wrap your main view content with the `PTForm` view provided by the SDK. This allows the custom text fields to access the necessary data:

```swift
var body: some View {
    PTForm {
        VStack {
            // Your form fields will go here
        }
    }
    .environmentObject(payTheory)
}
```

## Step 5: Add Custom Text Fields for Card Details

Use the custom text fields provided by the SDK to capture card details:

```swift
PTForm {
    VStack {
        PTCardName()
        PTCardNumber()
        PTExp()
        PTCvv()
        PTCardPostalCode()

        // Other form fields as needed
    }
}
.environmentObject(payTheory)
```

## Step 6: Implement Payment Button

Add a button to initiate the payment process:

```swift
Button("Pay") {
    payTheory.transact(amount: 1000, paymentMethod: .CARD) { response in
        switch response {
        case .Success(let payment):
            print("Payment successful: \(payment.transactionId)")
        case .Failure(let failure):
            print("Payment failed: \(failure.failureText)")
        case .Error(let error):
            print("Error: \(error.error)")
        case .Barcode:
            print("Barcode generation not applicable for card payments")
        }
    }
}
```

:::note Alternative: Tokenizing Payments
Instead of immediately processing a payment with `transact`, you can tokenize a payment method for later use.
:::

:::note Async Versions Available
Both `transact` and `tokenizePaymentMethod` have async versions that you can use with Swift's structured concurrency:

```swift
Button("Async Pay") {
    Task {
        let response = await payTheory.transact(amount: 1000, paymentMethod: .CARD)
        // Handle response
    }
}
```

Choose the version that best fits your app's architecture and your preferred coding style.
:::

## Complete Example

Here's a complete example putting it all together:

```swift
import SwiftUI
import PayTheory

struct ContentView: View {
    let payTheory = PayTheory(apiKey: "your-api-key-here") { error in
        print("Error: \(error.error)")
    }

    var body: some View {
        PTForm {
            VStack {
                PTCardName()
                PTCardNumber()
                PTExp()
                PTCvv()
                PTCardPostalCode()

                Button("Pay") {
                    payTheory.transact(amount: 1000, paymentMethod: .CARD) { response in
                        switch response {
                        case .Success(let payment):
                            print("Payment successful: \(payment.transactionId)")
                        case .Failure(let failure):
                            print("Payment failed: \(failure.failureText)")
                        case .Error(let error):
                            print("Error: \(error.error)")
                        case .Barcode:
                            print("Barcode generation not applicable for card payments")
                        }
                    }
                }
            }
        }
        .environmentObject(payTheory)
    }
}
```

This quick start guide demonstrates how to import the PayTheory package, initialize the PayTheory object, use the PTForm wrapper, add custom text fields for card details, and implement a payment button to process a transaction.

Remember to replace `"your-api-key-here"` with your actual PayTheory API key.

For more advanced usage and additional payment methods, please refer to the full SDK documentation.

