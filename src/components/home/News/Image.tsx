import React from 'react';
import { css } from 'linaria';

import Img from 'gatsby-image/withIEPolyfill';
import type { FluidObject } from 'gatsby-image';

export default function Image({ image }: Props): JSX.Element {
  return (
    <div className={styleContainer}>
      <div className={styleBorder} />
      <Img className={styleBackground} fluid={image} objectPosition="50% 50%" objectFit="cover" />
      <Img className={styleForeground} fluid={image} objectPosition="50% 50%" objectFit="contain" />
    </div>
  );
}

const styleContainer = css`
  position: relative;

  flex: 1 1 1px;
  width: 100%;

  background-color: #fff;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 230px;
  min-height: 130px;

  overflow: hidden;
`;

const styleForeground = css`
  width: 100%;
  height: 100%;
  min-width: 230px;
  min-height: 130px;
  z-index: 2;
`;

const styleBackground = css`
  position: absolute !important;

  width: 100%;
  height: 100%;
  min-width: 230px;
  min-height: 130px;

  filter: blur(4px);
  z-index: 1;
`;

const styleBorder = css`
  position: absolute !important;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 3;
  border: 10px solid #fff;
  box-sizing: border-box;
`;

type Props = { image: FluidObject };
