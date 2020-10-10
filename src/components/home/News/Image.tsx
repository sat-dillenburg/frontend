import React from 'react';
import { css } from 'linaria';

import Img from 'gatsby-image/withIEPolyfill';
import type { FluidObject } from 'gatsby-image';

export default function Image({ image, color }: Props): JSX.Element {
  return (
    <Img
      className={style}
      style={{ backgroundColor: color }}
      fluid={image}
      objectPosition="50% 50%"
      objectFit="contain"
    />
  );
}

const style = css`
  flex: 1 1 1px;
  width: 100%;
  border: 10px solid #fff;
  background-color: #fff;
  box-sizing: border-box;

  min-width: 230px;
  min-height: 130px;
`;

type Props = { image: FluidObject; color: string };
