import React from 'react';
import { css } from 'linaria';

export default function Title({ subject, speaker }: Props): JSX.Element {
  return (
    <div className={style}>
      <b className="subject">{subject.toUpperCase()}</b>
      {' / '}
      <span className="speaker">{speaker.toUpperCase()}</span>
    </div>
  );
}

const style = css`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  letter-spacing: 0.1em;
  max-width: 450px;

  .subject {
    font-weight: bold;
  }

  .speaker {
    display: inline-block;
  }
`;

type Props = { subject: string; speaker: string };
