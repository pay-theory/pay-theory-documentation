/* eslint-disable import/no-unresolved */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Developer documentation for Pay Theory payment processing: the GraphQL API, JavaScript, Apple iOS, and Android SDKs, and guides for online payments, invoicing, and recurring billing.">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
