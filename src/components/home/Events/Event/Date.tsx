import React from 'react';
import { css } from 'linaria';

export default function Date({ date }: Props): JSX.Element {
  return <div className={style}>{date}</div>;
}

const style = css`
  border-left: 1px solid #292929;
  padding-left: 22px;
  margin-bottom: 22px;

  font-family: 'Bebas';
  font-style: normal;
  font-weight: normal;
  font-size: 39px;
  letter-spacing: 0.15em;
`;

type Props = { date: string };
