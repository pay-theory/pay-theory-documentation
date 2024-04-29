import React from 'react';

export default function HomepageFeatures() {
  return (
    <div className="docs-home-content">
      <div className="hero">
        <div className="col">
          <h1>Documentation</h1>
          <p>Explore our guides and resources</p>
          <div className="button-row">
            <a
              href="../docs/Main/Getting Started/Quickstart"
              className="button button--primary button--md">
              Get started with payments
            </a>
            <a
              onClick={() => FreshworksWidget('open')}
              className="button button--secondary button--md">
              Request a sandbox
            </a>
          </div>
        </div>
      </div>

      <section className="home">
        <div className="container col--3">
          <div className="row">
            <div className="col">
              <h3>No Code</h3>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://paytheory.freshdesk.com/support/solutions/articles/44002441104-how-to-create-a-payment-link"
                    rel="noreferrer">
                    Accept payments with payment links
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://paytheory.freshdesk.com/support/solutions/articles/44002441108-how-to-create-an-invoice"
                    rel="noreferrer">
                    Send invoices
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h3>Low Code</h3>
              <ul>
                <li>
                  <a href="../docs/Main/OnlinePayments/PaymentButton">
                    Set up a payment button
                  </a>
                </li>
                <li>
                  <a href="../docs/Main/OnlinePayments/QRCode">
                    Take payments with QR codes
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h3>For Developers</h3>
              <ul>
                <li>
                  <a href="../docs/api/MAIN">API reference</a>
                </li>
                <li>
                  <a href="../docs/api/QUERY">Customize reporting</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="home">
        <div className="container col--2">
          <div className="row">
            <div className="section-header">
              <h2>Product Guides</h2>
              <p>Learn step by step how to implement our products</p>
            </div>
            <a
              href="../docs/Main/Getting Started/Quickstart"
              className="features">
              <div className="content">
                <img
                  src="/img/home_page/InclusiveIcon.svg"
                  alt="Online payments"></img>
                <div className="text">
                  <h4>Accepting Online Payments</h4>
                  <p>Create a custom checkout page with our SDK</p>
                </div>
              </div>
            </a>
            <a
              target="_blank"
              href="https://paytheory.freshdesk.com/support/solutions/articles/44002441108-how-to-create-an-invoice"
              className="features"
              rel="noreferrer">
              <div className="content">
                <img
                  src="/img/home_page/InvoicingIcon.svg"
                  alt="Invoicing & billing"></img>
                <div className="text">
                  <h4>Invoicing & Billing</h4>
                  <p>Send invoices to clients and customers</p>
                </div>
              </div>
            </a>
            <a href="../docs/api/RECURRING" className="features">
              <div className="content">
                <img
                  src="/img/home_page/RecurringIcon.svg"
                  alt="Recurring payments"></img>
                <div className="text">
                  <h4>Subscriptions & Recurring Payments</h4>
                  <p>Learn how to use our API to create recurring payments</p>
                </div>
              </div>
            </a>
            <a
              href="../docs/Main/OnlinePayments/Tokenizing/Quickstart"
              className="features">
              <div className="content">
                <img
                  src="/img/home_page/EmbeddedIcon.svg"
                  alt="Tokenizing a payment method"></img>
                <div className="text">
                  <h4>Tokenizing a Payment Method</h4>
                  <p>{"Recall a customer's previously used payment method"}</p>
                </div>
              </div>
            </a>
            <a href="../docs/Main/Testing" className="features">
              <div className="content">
                <img
                  src="/img/home_page/SaaSIcon.svg"
                  alt="Testing payments"></img>
                <div className="text">
                  <h4>Testing Payments</h4>
                  <p>Learn how to test payments on your platform</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="home last">
        <div className="container col--3">
          <div className="row">
            <div className="section-header">
              <h2>Resources</h2>
              {/* <div className='feedback'><ul><li><a>Submit Feedback</a></li></ul></div> */}
            </div>
            <a
              target="_blank"
              href="https://paytheory.freshdesk.com/support/solutions"
              className="col resources"
              rel="noreferrer">
              <h3>Knowledge Base</h3>
              <p>Learn more about our platform and how to use our tools</p>
            </a>
            <a
              target="_blank"
              href="https://paytheory.freshdesk.com/support/tickets/new"
              className="col resources"
              rel="noreferrer">
              <h3>Support</h3>
              <p>Contact customer support</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
