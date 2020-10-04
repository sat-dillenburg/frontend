import React from 'react';

import { css } from 'linaria';
import { graphql, useStaticQuery } from 'gatsby';

import Img from 'gatsby-image/withIEPolyfill';
import type { FixedObject } from 'gatsby-image';

const query = graphql`
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

export default function Background(): JSX.Element {
  const backgroundData = useStaticQuery<GQLData>(query).background;
  const imgSrc = backgroundData.childImageSharp.fixed;

  return <Img className={style} fixed={imgSrc} objectPosition="50% 50%" objectFit="cover" />;
}

const style = css`
  position: absolute !important;
  width: calc(50% + 82px) !important;
  height: 100% !important;
  right: 0;
`;

type ImageFixed = {
  childImageSharp: {
    fixed: FixedObject;
  };
};

type GQLData = {
  background: ImageFixed;
};
