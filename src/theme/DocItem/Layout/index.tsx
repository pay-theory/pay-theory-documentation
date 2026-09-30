import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Layout from '@theme-original/DocItem/Layout';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { TwoColumnContent } from '@lewl/graphql-doc/components';

type LayoutProps = {
  children: React.ReactNode;
  content?: { examplesByOperation?: Record<string, unknown> };
};

export default function LayoutWrapper(props: LayoutProps) {
  const { frontMatter, metadata } = useDoc();
  const isApiDoc = (frontMatter as Record<string, unknown>)?.api === true;
  const examplesByOperation =
    (metadata as { examplesByOperation?: Record<string, unknown> })
      ?.examplesByOperation ?? props.content?.examplesByOperation;

  if (!isApiDoc) {
    return <Layout {...props} />;
  }

  return (
    <div className="gql-docs-page">
      <Layout {...props}>
        <TwoColumnContent
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          examplesByOperation={examplesByOperation as any}>
          {props.children}
        </TwoColumnContent>
      </Layout>
    </div>
  );
}
