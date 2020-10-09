import React from 'react';

import { css } from 'linaria';
import { Helmet } from 'react-helmet';

import usePreviewData from '@hooks/use-preview-data';

import Layout from '@components/Layout';
import Footer from '@components/Footer';

import LiveTimerAlert from '@components/home/LiveTimerAlert';
import News, { NewsData } from '@components/home/News';
import Background from '@components/home/Background';
import Logo from '@components/home/Logo';
import Maintenance from '@components/home/Maintenance';
import Events from '@components/home/Events';

export default function Home(): JSX.Element {
  const previewData = usePreviewData(transformer);

  return (
    <Layout>
      <Helmet>
        <title>SAT Interim</title>
        <meta
          name="description"
          content={`SAT steht für Sonntagabendtreff, ein überkonfessioneller Jugendgottesdienst in Dillenburg.`}
        />
      </Helmet>

      <div className={$styles.container}>
        <Background />

        <div className={$styles.content}>
          <LiveTimerAlert />

          <Logo />
          <News data={previewData} />
          <Maintenance />
        </div>
      </div>

      <Events />
      <Footer />
    </Layout>
  );
}

const $styles = {
  container: css`
    position: relative;
    width: 100%;
    min-height: 100%;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
  `,

  content: css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    height: 100%;
    width: 100%;

    /* ie10, ie11, edge */
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }

    @supports (-ms-ime-align: auto) {
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }
  `,
};

const transformer = (data: PreviewData): NewsData => ({
  satInterim: {
    news_title: data.news_title,
    news_image_file: {
      childImageSharp: {
        fluid: {
          aspectRatio: 0,
          sizes: '',
          src: data.news_image.data.full_url,
          srcSet: '',
          tracedSVG: '',
        },
      },
    },

    news_article_display_name: data.news_article_display_name,
    news_article: {
      slug: data.news_article.slug,
    },
  },
});

type PreviewData = {
  news_title: string;

  news_image: {
    data: {
      full_url: string;
    };
  };

  news_article_display_name: string;
  news_article: {
    slug: string;
  };
};
