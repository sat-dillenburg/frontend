import React from 'react';
import { css } from 'linaria';

export default function Text({ text }: Props): JSX.Element {
  return (
    <div className={style}>
      {text && (
        <span>
          <b>T</b> {text.toUpperCase()}
        </span>
      )}
    </div>
  );
}

const style = css`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.1em;

  span {
    display: inline-block;
  }

  b {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    margin-right: 5px;
  }
`;

type Props = { text?: string };
