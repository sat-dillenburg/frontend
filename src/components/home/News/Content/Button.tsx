import React from 'react';
import { css } from 'linaria';
import { fluidRange } from 'polished';

export default function Button({ children }: Props): JSX.Element {
  return <span className={style}>{children}</span>;
}

const style = css`
  display: inline;
  background: #292929;
  padding: 3px 0;

  font-family: 'Bebas';
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.25em;
  text-decoration: none;

  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: '12px',
      toSize: '18px',
    },
    '420px',
    '820px',
  )}

  margin: 10px 0;
  color: #f2f2f2;
`;

type Props = { children: React.ReactNode };
