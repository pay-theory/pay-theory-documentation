/* eslint-disable import/no-unresolved */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

type NotFoundContentProps = {
  className?: string;
};

// Ejected from @docusaurus/theme-classic so the static 404.html also points
// agents and crawlers at the machine-readable indexes.
export default function NotFoundContent({ className }: NotFoundContentProps) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            Page Not Found
          </Heading>
          <p>We could not find what you were looking for.</p>
          <p>
            Start from the <Link to="/">Pay Theory documentation home</Link> or
            search the docs. Agents and tools can use{' '}
            <a href="/llms.txt">llms.txt</a>, the{' '}
            <a href="/llms-full.txt">full Markdown index</a>, or the{' '}
            <a href="/sitemap.xml">sitemap</a> to find every page.
          </p>
        </div>
      </div>
    </main>
  );
}
