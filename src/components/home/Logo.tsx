import React from 'react';
import { css } from 'linaria';

export default function Logo(): JSX.Element {
  return (
    <div className={style}>
      <span>SAT DILLENBURG</span>
    </div>
  );
}

const style = css`
  position: relative;
  flex: 0 1 auto;

  mix-blend-mode: difference;
  color: #fff;

  font-family: 'Bebas';
  font-style: normal;
  font-weight: normal;
  font-size: 34px;
  letter-spacing: 0.25em;
  text-align: center;

  padding: 50px 25px 0 25px;
  box-sizing: border-box;

  span {
    z-index: 1;
  }

  /* ie10, ie11, edge */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    span {
      color: #292929;
      background: #fff;
    }
  }

  @supports (-ms-ime-align: auto) {
    span {
      color: #292929;
      background: #fff;
    }
  }
`;
