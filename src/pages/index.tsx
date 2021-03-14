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

import spotify from '@assets/images/icons/spotify.png';
import itunes from '@assets/images/icons/itunes.png';
import google from '@assets/images/icons/google.png';
import youtube from '@assets/images/icons/youtube.png';

const transformer: Transformer = (data) => ({
  satInterim: {
    ...data,

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
  },
});

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

      <div className={$styles.survey}>
        <b className="title">
          Hilf uns für die nächste SAT-Staffel
          und mach mit bei der Umfrage.
        </b>

        <div className="items">
          <a href="https://umfrage.sat-dillenburg.de">
            umfrage.sat-dillenburg.de
          </a>
        </div>

        <div className="divider" />
      </div>

      <Events />

      <div className={$styles.podcast}>
        <b className="title">
          Du willst <u>alle</u> Predigten hören?
        </b>

        <div className="items">
          <a href="https://youtube.com/playlist?list=PLdDOq1CnKZn5MLi5dd_CXebqS6tl9Raez">
            <img src={youtube} />
          </a>

          <a href="https://open.spotify.com/show/46Ks6ei9kRsppOrT5G9pNm">
            <img src={spotify} />
          </a>

          <a href="https://podcasts.apple.com/de/podcast/sat-dillenburg-audio-podcast/id1339164714">
            <img src={itunes} />
          </a>

          <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9zYXQtZGlsbGVuYnVyZy5kZS9wb2RjYXN0LnhtbA">
            <img src={google} />
          </a>
        </div>
      </div>

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

  survey: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 50px 20px;
    padding-bottom: 0;

    .divider {
      width: calc(100% - 50px);
      margin: 0 auto;
      height: 0;
      padding-top: 50px;
      border-bottom: 1px dashed #292929;
      position: relative;
      bottom: 0;
    }

    .title {
      flex: 1 1 auto;
      font-family: 'Bebas Neue';
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      max-width: 460px;
      letter-spacing: 0.1em;
    }

    .items {
      flex: 1 1 auto;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      margin-top: 16px;

      a {
        font-family: 'Bebas Neue';
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        letter-spacing: 0.1em;
        text-decoration-line: underline;
        color: #292929;
      }
    }
  `,

  podcast: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 50px 20px;
    padding-top: 0;

    .title {
      flex: 1 1 auto;
      font-family: 'Bebas Neue';
      font-size: 28px;
      font-weight: bold;
      text-align: center;
    }

    .items {
      flex: 1 1 auto;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      margin-top: 16px;

      a {
        flex: 1 1 auto;
        padding: 0 10px;
        font-family: 'Bebas Neue';
        font-size: 18px;
        font-weight: normal;

        color: #2196f3;

        img {
          width: 38px;
          height: 38px;
        }
      }
    }
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

type Transformer = (data: PreviewData) => NewsData;

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
