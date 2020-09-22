import React from 'react';
import { css } from 'linaria';

import Layout from '@components/Layout';
import Footer from '@components/Footer';

import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import '@assets/fonts/_fonts-roboto.css';

function extractContent(s: string): string {
  const span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
}

export default function Page(props: Props): JSX.Element {
  const { pathContext } = props;
  const { title, content } = pathContext;

  console.log();

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={extractContent(content)} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/home">Zurück</Link>
          <h1 className="title">{title}</h1>
          <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

const styles = {
  container: css`
    max-width: 1080px;
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
  `,

  content: css`
    position: relative;
    flex: 1 1 auto;
    max-width: 100%;
    word-break: break-word;
  `,
};

type Props = {
  path: string;
  pathContext: {
    title: string;
    content: string;
  };
};
