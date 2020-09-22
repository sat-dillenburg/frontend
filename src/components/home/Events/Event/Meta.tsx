import React from 'react';
import { css } from 'linaria';

export default function Meta({ moderation, band }: Props): JSX.Element {
  return (
    <div className={style}>
      {moderation && (
        <span>
          <b>M</b> {moderation.toUpperCase()}
        </span>
      )}

      {moderation && band && ' | '}

      {band && (
        <span>
          <b>B</b> {band.toUpperCase()}
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

type Props = { moderation?: string; band?: string };
