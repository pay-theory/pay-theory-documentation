# Google Pay Documentation Review Checklist

Use this checklist to ensure Pay Theory's Google Pay developer documentation meets Google's requirements and includes all necessary information for merchants.

## Branding Requirements

### Google Pay Trademark
- [ ] First mention of "Google Pay" on feature pages includes the trademark symbol (™)
- [ ] Most prominent mention of "Google Pay" includes the trademark symbol (™)

### Approved Branding Assets
- [ ] Documentation uses approved Google Pay branding assets
- [ ] All button designs follow Google Pay Web brand guidelines
- [ ] Assets comply with Google Pay Web brand guidelines

## Implementation Paths

### Web Support (Required)
- [ ] Links to Google Pay Web developer documentation
- [ ] Links to Google Pay Web integration checklist
- [ ] Links to Google Pay Web Brand Guidelines

### Merchant Integration Requirements
Since merchants handle SDK integration and Google Pay setup:
- [ ] Documentation clearly states that merchants are responsible for:
  - [ ] Loading the Google Pay API JavaScript client library
  - [ ] Checking browser compatibility with `IsReadyToPayRequest`
  - [ ] Generating `PaymentDataRequest` properties
  - [ ] Registering with Google Pay & Wallet Console
  - [ ] Obtaining a Google merchant ID
- [ ] References Google Pay APIs Acceptable Use Policy
- [ ] References Google Pay API Terms of Service
- [ ] Clear explanation that Pay Theory handles only the final token processing

## Implementation Details

### 3D Secure Support
- [ ] Defines how merchants enable 3DS for card transactions
- [ ] Explains 3DS process for PAN_ONLY credentials from Google Pay API
- [ ] Documents that both 3DS and PAN_ONLY authentication methods are supported

### Gateway Configuration
- [ ] Defines the exact value merchants must set for `gateway` parameter
- [ ] Defines the exact value merchants must set for `gatewayMerchantID` parameter
- [ ] Provides examples of correct gateway configuration

### Authorization Methods
- [ ] Lists all supported authorization methods (PAN_ONLY and 3DS)
- [ ] Explains differences between authorization methods
- [ ] Provides guidance on when to use each method

### Card Networks
- [ ] Lists all supported card networks
- [ ] Confirms no geographic restrictions apply

### Billing Address Requirements
- [ ] **Clearly states that billing address is REQUIRED for all transactions**
- [ ] References `BillingAddressParameters` documentation
- [ ] Provides example of required billing address format
- [ ] Explains validation requirements for billing address

### Payment Data Transmission
- [ ] Documents how merchants send the Google Pay token payload to Pay Theory servers
- [ ] Provides clear API endpoint documentation for token submission
- [ ] Includes example API calls with required headers and body format
- [ ] Documents expected response format from Pay Theory
- [ ] Explains error handling for failed token processing

## Token Processing Documentation

### Pay Theory's Role
- [ ] Clearly defines that Pay Theory processes only the final encrypted payment token
- [ ] Documents the exact format of token payload Pay Theory expects
- [ ] Provides sample token payload structure
- [ ] Lists all required fields in the token payload
- [ ] Documents any Pay Theory-specific requirements or validations

### Integration Flow
- [ ] Provides clear step-by-step integration flow showing:
  - [ ] What merchants handle (SDK setup, user interaction)
  - [ ] What Pay Theory handles (token processing)
- [ ] Includes sequence diagram or flow chart if helpful
- [ ] Documents timing expectations for token processing

## Error Handling & Testing

### Error Documentation
- [ ] Lists common error codes and messages
- [ ] Provides troubleshooting guide for common integration issues
- [ ] Documents retry logic recommendations

### Testing Resources
- [ ] Provides test card numbers for Google Pay testing
- [ ] Documents sandbox/test environment details
- [ ] Includes example test token payloads

## Final Review

- [ ] All links are functional and point to correct resources
- [ ] Code examples are tested and working
- [ ] API examples use correct Pay Theory endpoints
- [ ] Documentation clearly delineates merchant vs Pay Theory responsibilities
- [ ] Contact information provided for merchant support
- [ ] Documentation follows Pay Theory's style guidelines