import React from 'react';

import { css } from 'linaria';
import { fluidRange } from 'polished';

export default function Maintenance(): JSX.Element {
  return (
    <div className={style}>
      <div className="text">
        DIE SAT-WEBSEITE BEFINDET SICH MOMENTAN IN EINER UMBAUPHASE, SEID GESPANNT.. BIS DAHIN NUR DAS WICHTIGSTE.
      </div>
    </div>
  );
}

const style = css`
  mix-blend-mode: difference;
  color: #fff;

  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.15em;
  text-align: right;

  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: '18px',
      toSize: '28px',
    },
    '420px',
    '820px',
  )}

  position: relative;
  flex: 0 1 auto;

  padding: 50px;
  padding-top: 0;

  z-index: 1;

  .text {
    float: right;
    width: 400px;
    max-width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
  }

  @media only screen and (min-width: 560px) {
    margin-top: -75px;

    .text {
      max-width: 50%;
    }
  }

  /* ie10, ie11, edge */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .text {
      color: #292929;
      background: #fff;
    }
  }

  @supports (-ms-ime-align: auto) {
    .text {
      color: #292929;
      background: #fff;
    }
  }
`;
