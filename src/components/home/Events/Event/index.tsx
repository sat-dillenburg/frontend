import React from 'react';

import EventDate from '@src/components/home/Events/Event/Date';
import EventTitle from '@src/components/home/Events/Event/Title';
import EventMeta from '@src/components/home/Events/Event/Meta';
import EventLinks, { Link } from '@src/components/home/Events/Event/Links';

import { css } from 'linaria';

export default function Event(data: Props): JSX.Element {
  const { date, subject, speaker } = data;
  const { moderation, band, links } = data;

  return (
    <div className={styles.date}>
      <EventDate date={date} />
      <EventTitle subject={subject} speaker={speaker} />
      <EventMeta moderation={moderation} band={band} />
      <EventLinks links={links} />

      <div className="divider" />
    </div>
  );
}

const styles = {
  date: css`
    flex: 1 1 auto;
    color: #292929;
    padding: 0 20px;
    padding-bottom: 40px;
    margin-top: 50px;
    position: relative;

    .divider {
      width: calc(100% - 50px);
      margin: 0 auto;
      height: 0;
      border-bottom: 1px dashed #292929;
      position: absolute;
      bottom: 0;
    }
  `,
};

type Props = {
  date: string;
  subject: string;
  speaker: string;
  moderation?: string;
  band?: string;
  links?: Link[];
};
