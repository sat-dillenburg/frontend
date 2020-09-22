import React from 'react';

import { graphql } from 'gatsby';
import { css } from 'linaria';

import Layout from '@components/Layout';
import News from '@src/components/home/News';
import Background from '@src/components/home/Background';
import Logo from '@src/components/home/Logo';
import Maintenance from '@src/components/home/Maintenance';
import Events from '@src/components/home/Events';
import Footer from '@components/Footer';

import { Helmet } from 'react-helmet';

import type { PageProps } from 'gatsby';
import type { FixedObject } from 'gatsby-image';

export default function Home({ data }: Props): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>SAT Interim</title>
        <meta name="description" content="Die SAT-Webseite befindet sich momentan in der Umbauphase, seid gespannt." />
      </Helmet>

      <div className={$styles.container}>
        <Background image={data?.background?.childImageSharp?.fixed} />

        <div className={$styles.content}>
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

export const $query = graphql`
  query {
    background: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fixed(width: 2000, quality: 90) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`;

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

type ImageFixed = {
  childImageSharp: {
    fixed: FixedObject;
  };
};

interface Props extends PageProps {
  data: {
    background: ImageFixed;
  };
}
