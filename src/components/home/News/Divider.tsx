import React from 'react';
import { css } from 'linaria';
import { fluidRange } from 'polished';

export default function Divider(): JSX.Element {
  return <div className={style} />;
}

const style = css`
  ${fluidRange(
    {
      prop: 'height',
      fromSize: '5px',
      toSize: '15px',
    },
    '420px',
    '820px',
  )}
`;
