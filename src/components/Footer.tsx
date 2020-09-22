import React from 'react';
import { css } from 'linaria';

import { Link } from 'gatsby';

import '@assets/fonts/_fonts-bebas.css';
import '@assets/fonts/_fonts-roboto-mono.css';
import '@assets/global.css';

const Footer = (): JSX.Element => (
  <div className={$styles.footer}>
    (c) 2014-2020
    <br />
    sat-dillenburg.de
    <br />
    <br />
    <Link to="/page/impressum">Impressum</Link>
    <span> | </span>
    <Link to="/page/haftungsausschluss-(disclaimer)">Haftungsausschluss</Link>
    <span> | </span>
    <Link to="/page/datenschutzerklarung">Datenschutzerklärung</Link>
  </div>
);

const $styles = {
  footer: css`
    font-family: 'Bebas';
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0.15em;

    background: #292929;
    color: #e5e5e5;
    padding: 50px;

    span,
    a {
      font-family: 'Bebas Neue';
      font-size: 18px;
      text-decoration-line: underline;

      color: #e5e5e5;
    }

    span {
      text-decoration-line: none;
    }
  `,
};

export default Footer;
