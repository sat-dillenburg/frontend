import React from 'react';
import { css } from 'linaria';

export default function Links({ links }: Props): JSX.Element {
  return (
    <>
      {links &&
        links.map(({ value }) => (
          <a key={value.link} className={style} href={value.link}>
            {value.title}
          </a>
        ))}
    </>
  );
}

const style = css`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  letter-spacing: 0.1em;
  text-decoration-line: underline;
  color: #292929;

  margin-top: 12px;
  display: inline-block;
`;

type Props = { links?: Link[] };

export type Link = {
  value: {
    link: string;
    title: string;
  };
};
