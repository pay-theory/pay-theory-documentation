import {
  defaultElementIds,
  ElementTypes,
  MERCHANT_FEE,
  SERVICE_FEE,
} from './data';

/**
 *  Enum representing different types of response messages.
 *
 */
export enum ResponseMessageTypes {
  /**
   * Indicates a successful response.
   */
  SUCCESS = 'SUCCESS',
  /**
   * Indicates an error response.
   */
  ERROR = 'ERROR',
  /**
   * Indicates a confirmation response.
   */
  CONFIRMATION = 'CONFIRMATION',
  /**
   * Indicates a failed response.
   */
  FAILED = 'FAILED',
  /**
   * Indicates a response involving cash.
   */
  CASH = 'CASH',
  /**
   * Indicates a response involving a tokenized mechanism.
   */
  TOKENIZED = 'TOKENIZED',
}

/**
 * Represents an address object with optional properties.
 * @typedef {Object} AddressObject
 * @property {string} [line1] - The first line of the address, typically street address or house number.
 * @property {string} [line2] - The second line of the address, for additional address details if needed.
 * @property {string} [city] - The city or locality of the address.
 * @property {string} [region] - The region, state, or province of the address.
 * @property {string} [postal_code] - The postal or ZIP code of the address.
 * @property {string} [country] - The country of the address.
 */

export type AddressObject = {
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
};

/**
 * Represents information about a payor.
 * @typedef {Object} PayorInfo
 * @property {string} [first_name] - The first name of the payor.
 * @property {string} [last_name] - The last name of the payor.
 * @property {string} [email] - The email address of the payor.
 * @property {string} [phone] - The phone number of the payor.
 * @property {AddressObject} [personal_address] - The personal address of the payor.
 */

export type PayorInfo = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  personal_address?: AddressObject;
};

export type BillingInfo = {
  name?: string;
  address?: AddressObject;
};

export type ConfirmationObject = {
  first_six: string;
  last_four: string;
  brand: string;
  receipt_number: string;
  amount: number;
  service_fee: number;
};

export type ConfirmationResponse = {
  type: ResponseMessageTypes.CONFIRMATION;
  body: ConfirmationObject;
};

export type SuccessfulTransactionObject = {
  receipt_number: string;
  last_four: string;
  brand: string;
  created_at: string;
  amount: number;
  service_fee: number;
  state: string;
  // Keeping tags in the response for backwards compatibility
  tags: { [keys: string | number]: string | number | boolean };
  metadata: { [keys: string | number]: string | number | boolean };
  payor_id: string;
  payment_method_id: string;
};

export type SuccessfulTransactionResponse = {
  type: ResponseMessageTypes.SUCCESS;
  body: SuccessfulTransactionObject;
};

export type FailedTransactionObject = {
  receipt_number: string;
  last_four: string;
  brand: string;
  state: string;
  type: string;
  payor_id: string;
};

export type FailedTransactionResponse = {
  type: ResponseMessageTypes.FAILED;
  body: FailedTransactionObject;
};

export type CashBarcodeObject = {
  barcodeUrl: string;
  mapUrl: string;
};

export type CashBarcodeResponse = {
  type: ResponseMessageTypes.CASH;
  body: CashBarcodeObject;
};

export type TokenizedPaymentMethodObject = {
  payment_method_id: string;
  payor_id: string;
  last_four: string;
  brand: string;
  expiration: string;
  payment_type: 'card' | 'ach';
  metadata: { [keys: string | number]: string | number | boolean };
};

export type TokenizedPaymentMethodResponse = {
  type: ResponseMessageTypes.TOKENIZED;
  body: TokenizedPaymentMethodObject;
};

// Error Types

/**
 * Enum representing different types of error messages.
 * @typedef {Object} ErrorType
 * @property {string} [NO_FIELDS] - Indicates that required fields are missing in the request.
 * @property {string} [NOT_VALID] - Indicates that the provided data is not valid.
 * @property {string} [INVALID_PARAM] - Indicates that an invalid parameter is passed to a function or API.
 * @property {string} [SESSION_EXPIRED] - Indicates that the user's session has expired.
 * @property {string} [NO_TOKEN] - Indicates that no valid token is available for authentication.
 * @property {string} [FIELD_ERROR] - Indicates an error related to a specific field in the data.
 * @property {string} [CANCEL_FAILED] - Indicates that a cancellation operation has failed.
 * @property {string} [ACTION_COMPLETE] - Indicates the completion of a certain action or operation.
 * @property {string} [ACTION_IN_PROGRESS] - Indicates that an action is currently in progress.
 * @property {string} [TRANSACTING_FIELD_ERROR] - Indicates a field error during a transaction process.
 * @property {string} [SOCKET_ERROR] - Indicates an error related to socket communication.
 * @property {string} [NOT_READY] - Indicates that a certain resource is not ready or available.
 */
export enum ErrorType {
  NO_FIELDS = 'NO_FIELDS',
  NOT_VALID = 'NOT_VALID',
  INVALID_PARAM = 'INVALID_PARAM',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  NO_TOKEN = 'NO_TOKEN',
  FIELD_ERROR = 'FIELD_ERROR',
  CANCEL_FAILED = 'CANCEL_FAILED',
  ACTION_COMPLETE = 'ACTION_COMPLETE',
  ACTION_IN_PROGRESS = 'ACTION_IN_PROGRESS',
  TRANSACTING_FIELD_ERROR = 'TRANSACTING_FIELD_ERROR',
  SOCKET_ERROR = 'SOCKET_ERROR',
  NOT_READY = 'NOT_READY',
}

export type ErrorResponse = {
  type: ResponseMessageTypes.ERROR;
  error: string;
};

// Function Prop Types
export type TokenizeProps = {
  payorInfo?: PayorInfo;
  payorId?: string;
  metadata?: { [keys: string | number]: string | number | boolean };
  billingInfo?: BillingInfo;
};

export type TransactProps = {
  amount: number;
  payorInfo?: PayorInfo;
  billingInfo?: BillingInfo;
  payorId?: string;
  metadata?: { [keys: string | number]: string | number | boolean };
  feeMode?: typeof MERCHANT_FEE | typeof SERVICE_FEE;
  fee?: number;
  confirmation?: boolean;
  accountCode?: string;
  reference?: string;
  paymentParameters?: string;
  invoiceId?: string;
  sendReceipt?: boolean;
  receiptDescription?: string;
  recurringId?: string;
};

export type PayTheoryPaymentFieldsInput = {
  apiKey: string;
  styles?: StyleObject;
  metadata?: { [key: string | number]: string | number | boolean };
  placeholders?: PlaceholderObject;
  elementIds?: typeof defaultElementIds;
  session?: string;
  feeMode?: typeof MERCHANT_FEE | typeof SERVICE_FEE;
};

export enum AcceptedPaymentMethods {
  ALL = 'ALL',
  NOT_CASH = 'NOT_CASH',
  NOT_CARD = 'NOT_CARD',
  NOT_ACH = 'NOT_ACH',
  ONLY_CASH = 'ONLY_CASH',
  ONLY_CARD = 'ONLY_CARD',
  ONLY_ACH = 'ONLY_ACH',
}

export enum CallToAction {
  PAY = 'PAY',
  DONATE = 'DONATE',
  BOOK = 'BOOK',
  CHECKOUT = 'CHECKOUT',
}

export enum ButtonColor {
  PURPLE = 'PURPLE',
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  GREY = 'GREY',
}

export type CheckoutDetails = {
  amount: number;
  paymentName: string;
  paymentDescription?: string;
  requirePhone?: boolean;
  callToAction?: CallToAction;
  acceptedPaymentMethods?: AcceptedPaymentMethods;
  payorId?: string;
  metadata?: { [keys: string | number]: string | number | boolean };
  feeMode?: typeof MERCHANT_FEE | typeof SERVICE_FEE;
  accountCode?: string;
  paymentParameters?: string;
  invoiceId?: string;
  recurringId?: string;
};

export type PayTheoryQRInput = {
  apiKey: string;
  checkoutDetails: CheckoutDetails;
  size: number;
  onReady: (ready: true) => void;
  onError: (error: string) => void;
  onSuccess: (result: SuccessfulTransactionObject) => void;
};

export type ButtonStyle = {
  color: ButtonColor;
  callToAction: CallToAction;
  pill: boolean;
  height: number;
};

export type PayTheoryButtonInput = {
  apiKey: string;
  checkoutDetails: CheckoutDetails;
  style: ButtonStyle;
  onReady: (ready: true) => void;
  onClick: () => void;
  onError: (error: string) => void;
  onCancel: () => void;
  onSuccess: (result: SuccessfulTransactionObject) => void;
  onBarcode: (result: CashBarcodeObject) => void;
};

export type FieldState = {
  isFocused: boolean;
  isDirty: boolean;
  errorMessages: string[];
};

export type StateObject = Record<ElementTypes, FieldState>;

export type PlaceholderObject = Partial<Record<ElementTypes, string>>;

export type StyleObject = {
  default: object;
  success: object;
  error: object;
  radio?: {
    width: number;
    fill: string;
    stroke: string;
    text: {
      fontSize: string;
      color: string;
    };
  };
  hidePlaceholder?: boolean;
};
