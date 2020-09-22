import React from 'react';
import { css } from 'linaria';
import { between, fluidRange } from 'polished';

export default function Title({ children }: Props): JSX.Element {
  return <span className={style}>{children}</span>;
}

const style = css`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.17em;
  color: #292929;

  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: '24px',
      toSize: '44px',
    },
    '420px',
    '820px',
  )}

  ${fluidRange(
    {
      prop: 'line-height',
      fromSize: '28px',
      toSize: '48px',
    },
    '420px',
    '820px',
  )}

  box-shadow: inset 0 ${between('-12px', '-22px', '420px', '820px')} 0px #e5e5e5;

  @media (min-width: 820px) {
    box-shadow: inset 0 -22px 0px #e5e5e5;
  }

  @media (max-width: 420px) {
    box-shadow: inset 0 -12px 0px #e5e5e5;
  }

  @media (max-width: 700px) {
    background-color: #ffffff;
  }

  margin-right: 10px;
`;

type Props = { children: React.ReactNode };
