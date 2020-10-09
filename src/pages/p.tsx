import React from 'react';
import { css } from 'linaria';

import Layout from '@components/Layout';
import Footer from '@components/Footer';

import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import { hyphenateHTMLSync, hyphenateSync } from 'hyphen/de';
import { AllHtmlEntities } from 'html-entities';

import usePreviewData from '@hooks/use-preview-data';

import '@assets/fonts/_fonts-roboto.css';

const entities = new AllHtmlEntities();

function extractContent(htmlString: string): string {
  const strippedContent = htmlString.replace(/<[^>]+>/g, '').substring(0, 150);
  return `${strippedContent}...`;
}

function decode(string: string, hyphenFn: (string: string) => string): string {
  return hyphenFn(entities.decode(string));
}

export default function Page(props: Props): JSX.Element {
  const previewData = usePreviewData(transformer);
  const { pathContext } = props;

  const content = previewData?.content ?? pathContext.content ?? '<h1>...</h1>';
  const title = previewData?.title ?? pathContext.title ?? 'Bitte warte kurz, der Inhalt wird geladen..';

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={extractContent(content)} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/">Zurück</Link>
          <h1 className="title">{decode(title, hyphenateSync)}</h1>
          <div className="content" dangerouslySetInnerHTML={{ __html: decode(content, hyphenateHTMLSync) }} />
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

const styles = {
  container: css`
    max-width: 680px;
    min-width: 680px;

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    font-family: 'Roboto';
    padding: 50px;
    color: #292929;

    img {
      max-width: 100%;
    }

    a {
      color: #292929;
    }

    .title {
      font-size: 44px;
    }

    code,
    pre {
      font-family: 'Roboto Mono';
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Bebas Neue';
    }

    blockquote {
      margin-inline-start: 20px;
      margin-inline-end: 20px;
    }
  `,

  content: css`
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    max-width: 100%;

    word-break: break-word;
  `,
};

const transformer = (data: PreviewData): PageData => data;

type Props = {
  path: string;
  pathContext: {
    title: string;
    content: string;
  };
};

type PageData = {
  title: string;
  content: string;
};

type PreviewData = {
  slug: string;
  title: string;
  content: string;
};
