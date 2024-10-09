/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  // tutorialSidebar: ['api/main', 'sdk/apple/state'],
  apiSidebar: [
    {
      type: 'doc',
      id: 'api/main',
    },
    {
      type: 'doc',
      id: 'api/query',
    },
    {
      type: 'html',
      value: "<hr style='margin: 16px 0 0'/>",
    },
    {
      type: 'doc',
      id: 'api/authorization',
    },
    {
      type: 'doc',
      id: 'api/barcode',
    },
    {
      type: 'doc',
      id: 'api/dispute',
    },
    {
      type: 'doc',
      id: 'api/invoice',
    },
    {
      type: 'doc',
      id: 'api/merchant',
    },
    {
      type: 'doc',
      id: 'api/metadata',
    },
    {
      type: 'doc',
      id: 'api/payment_links',
    },
    {
      type: 'doc',
      id: 'api/payment_method_token',
    },
    {
      type: 'doc',
      id: 'api/payor',
    },
    {
      type: 'doc',
      id: 'api/recurring',
    },
    {
      type: 'doc',
      id: 'api/settlement',
    },
    {
      type: 'doc',
      id: 'api/transaction',
    },
    {
      type: 'doc',
      id: 'api/users',
    },
    {
      type: 'doc',
      id: 'api/webhooks',
    },
    {
      type: 'html',
      value: "<hr style='margin: 16px 0 0'/>",
    },
    {
      type: 'doc',
      id: 'api/deprecated',
    },
  ],
  // tsSidebar: [{ type: 'autogenerated', dirName: 'api' }],
  homeSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'autogenerated',
          dirName: 'main/getting_started',
        },
      ],
    },
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: 'Online Payments',
      items: [
        {
          type: 'doc',
          id: 'main/online_payments/ach_payments',
        },
        {
          type: 'doc',
          id: 'main/online_payments/cash_payments',
        },

        {
          type: 'doc',
          id: 'main/online_payments/payment_button',
        },
        {
          type: 'doc',
          id: 'main/online_payments/payment_links',
        },
        {
          type: 'doc',
          id: 'main/online_payments/qr_code',
        },
        {
          type: 'category',
          label: 'Tokenizing Payments',
          items: [
            'main/online_payments/tokenizing/quickstart',
            'main/online_payments/tokenizing/recalling_payment_methods',
            'main/online_payments/tokenizing/making_a_payment_with_payment_tokens',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'After the Payments',
      items: [
        {
          type: 'autogenerated',
          dirName: 'main/after_payments',
        },
      ],
    },
    {
      type: 'category',
      label: 'Recurring Payments',
      items: [
        {
          type: 'doc',
          id: 'main/recurring_payments/overview',
        },
        {
          type: 'doc',
          id: 'main/recurring_payments/create_a_payment_plan',
        },
        {
          type: 'doc',
          id: 'main/recurring_payments/create_a_subscription',
        },
        {
          type: 'category',
          label: 'Manage Recurring Payments',
          items: [
            'main/recurring_payments/manage_recurring_payments/cancel_recurring_payments',
            'main/recurring_payments/manage_recurring_payments/update_recurring_payments',
            'main/recurring_payments/manage_recurring_payments/missed_recurring_payment_data',
            'main/recurring_payments/manage_recurring_payments/retry_failed_recurring_payments',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Invoicing and Billing',
      items: [
        {
          type: 'autogenerated',
          dirName: 'main/invoicing_and_billing',
        },
      ],
    },
    // {
    //   type: 'category', label: 'Updates',
    //   items: [
    //     {
    //       type:'autogenerated', dirName:'main/updates'
    //     }
    //   ]
    // },
    {
      type: 'doc',
      id: 'main/testing',
    },
    {
      type: 'doc',
      id: 'main/changelog',
    },
  ],
  androidSidebar: [{ type: 'autogenerated', dirName: 'sdk/android' }],
  appleSidebar: [
    {
      type: 'doc',
      id: 'sdk/apple/main',
    },
    {
      type: 'doc',
      id: 'sdk/apple/pay_theory_class',
    },
    {
      type: 'category',
      label: 'Functions',
      items: [
        {
          type: 'doc',
          id: 'sdk/apple/functions/transact',
        },
        {
          type: 'doc',
          id: 'sdk/apple/functions/tokenize_payment_method',
        },
        {
          type: 'doc',
          id: 'sdk/apple/functions/reset_pt',
        },
        {
          type: 'doc',
          id: 'sdk/apple/functions/update_amount',
        },
      ],
    },
    {
      type: 'category',
      label: 'State Management',
      items: [
        {
          type: 'doc',
          id: 'sdk/apple/state/overview',
        },
        {
          type: 'doc',
          id: 'sdk/apple/state/ach_state',
        },
        {
          type: 'doc',
          id: 'sdk/apple/state/card_state',
        },
        {
          type: 'doc',
          id: 'sdk/apple/state/cash_state',
        },
      ],
    },
    {
      type: 'category',
      label: 'Response Types',
      items: [
        {
          type: 'doc',
          id: 'sdk/apple/response_types/pt_error',
        },
        {
          type: 'doc',
          id: 'sdk/apple/response_types/transaction_response',
        },
        {
          type: 'doc',
          id: 'sdk/apple/response_types/tokenization_response',
        },
      ],
    },
    {
      type: 'category',
      label: 'UI Components',
      items: [
        {
          type: 'doc',
          id: 'sdk/apple/ui_components/pt_form',
        },
        {
          type: 'doc',
          id: 'sdk/apple/ui_components/ach_fields',
        },
        {
          type: 'doc',
          id: 'sdk/apple/ui_components/card_fields',
        },
        {
          type: 'doc',
          id: 'sdk/apple/ui_components/cash_fields',
        },
      ],
    },
    {
      type: 'category',
      label: 'Data Models',
      items: [
        {
          type: 'doc',
          id: 'sdk/apple/data_models/address',
        },
        {
          type: 'doc',
          id: 'sdk/apple/data_models/payor',
        },
        {
          type: 'doc',
          id: 'sdk/apple/data_models/level_3_summary',
        },
        {
          type: 'doc',
          id: 'sdk/apple/data_models/enums',
        },
      ],
    },
  ],
  javascriptSidebar: [{ type: 'autogenerated', dirName: 'sdk/javascript' }],
};
