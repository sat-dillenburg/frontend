import React from 'react';
import { css } from 'linaria';

import Img from 'gatsby-image/withIEPolyfill';
import type { FixedObject } from 'gatsby-image';

export default function Background({ image }: Props): JSX.Element {
  return <Img className={style} fixed={image} objectPosition="50% 50%" objectFit="cover" />;
}

const style = css`
  position: absolute !important;
  width: calc(50% + 82px) !important;
  height: 100% !important;
  right: 0;
`;

type Props = { image: FixedObject };
