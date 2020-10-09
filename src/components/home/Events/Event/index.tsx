import React from 'react';

import EventDate from '@components/home/Events/Event/Date';
import EventTitle from '@components/home/Events/Event/Title';
import EventMeta from '@components/home/Events/Event/Meta';
import EventText from '@components/home/Events/Event/Text';
import EventLinks, { Link } from '@components/home/Events/Event/Links';

import { css } from 'linaria';

export default function Event(data: Props): JSX.Element {
  const { date, subject, text, speaker } = data;
  const { moderation, band, links } = data;

  return (
    <div className={styles.date}>
      <EventDate date={date} />
      <EventTitle subject={subject} speaker={speaker} />
      <EventText text={text} />
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
  speaker: string;
  subject: string;
  text: string | null;

  moderation: string | null;
  band: string | null;
  links: Link[] | null;
};
