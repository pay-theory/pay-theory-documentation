import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { TwoColumnContent } from '@graphql-docs/generator/components';

type LayoutProps = {
  children: React.ReactNode;
  content?: { examplesByOperation?: Record<string, unknown> };
};

export default function LayoutWrapper(props: LayoutProps) {
  const { frontMatter, metadata } = useDoc();
  const isApiDoc = frontMatter?.api === true;
  const examplesByOperation =
    (metadata as { examplesByOperation?: Record<string, unknown> })?.examplesByOperation ??
    props.content?.examplesByOperation;

  if (!isApiDoc) {
    return <Layout {...props} />;
  }

  return (
    <div className="gql-docs-page">
      <Layout {...props}>
        <TwoColumnContent examplesByOperation={examplesByOperation}>
          {props.children}
        </TwoColumnContent>
      </Layout>
    </div>
  );
}
