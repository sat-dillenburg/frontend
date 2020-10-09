import React, { useEffect } from 'react';

import { css } from 'linaria';

import Layout from '@components/Layout';
import Footer from '@components/Footer';

import LiveTimerAlert from '@components/home/LiveTimerAlert';
import News from '@components/home/News';
import Background from '@components/home/Background';
import Logo from '@components/home/Logo';
import Maintenance from '@components/home/Maintenance';
import Events from '@components/home/Events';

import { Helmet } from 'react-helmet';

export default function Home(): JSX.Element {
  useEffect(() => {
    console.log('mounted');

    const handler = (event: MessageEvent) => {
      console.log(event);

      if (!(event.source instanceof MessagePort) && !(event.source instanceof ServiceWorker)) {
        event.source?.postMessage('got-it', event.origin);
      }
    };

    window.addEventListener('message', handler, false);

    return () => {
      window.removeEventListener('message', handler, false);
    };
  }, []);

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
          <News />
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
