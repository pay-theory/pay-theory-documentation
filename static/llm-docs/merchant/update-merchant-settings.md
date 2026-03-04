# updateMerchantSettings

> **Group:** Merchant
> **Operation Type:** MUTATION

Updates merchant settings.

## GraphQL Signature

```graphql
mutation updateMerchantSettings($merchant_uid: ID!, $settings: MerchantSettingsInput!) {
  updateMerchantSettings(merchant_uid: $merchant_uid, settings: $settings)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The unique identifier of the merchant whose settings are being updated. |
| `settings` | `MerchantSettingsInput!` | Yes | The new settings for the merchant. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example updateMerchantSettings

Updates merchant settings.

**Query:**

```graphql
mutation UpdateMerchantSettings($merchant_uid: ID!, $settings: MerchantSettingsInput!) {
  updateMerchantSettings(merchant_uid: $merchant_uid, settings: $settings)
}
```

**Variables:**

```json
{
  "merchant_uid": "id_123",
  "settings": {
    "contact_email": "user@example.com",
    "contact_phone": "+15555555555",
    "facebook": "https://example.com",
    "instagram": "https://example.com",
    "linkedin": "https://example.com",
    "tiktok": "https://example.com",
    "twitter": "https://example.com",
    "website": "https://example.com"
  }
}
```

**Response:**

```json
{
  "data": {
    "updateMerchantSettings": true
  }
}
```


## Type Definitions

### MerchantSettingsInput

Input for merchant settings.

| Field | Type | Description |
| --- | --- | --- |
| `contact_email` | `AWSEmail` | The contact email for the merchant. |
| `contact_phone` | `AWSPhone` | The contact phone number for the merchant. |
| `facebook` | `AWSURL` | The Facebook URL for the merchant. |
| `instagram` | `AWSURL` | The Instagram URL for the merchant. |
| `linkedin` | `AWSURL` | The LinkedIn URL for the merchant. |
| `tiktok` | `AWSURL` | The TikTok URL for the merchant. |
| `twitter` | `AWSURL` | The Twitter URL for the merchant. |
| `website` | `AWSURL` | The website URL for the merchant. |