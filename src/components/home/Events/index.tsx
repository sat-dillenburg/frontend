import React from 'react';

import Event from '@components/home/Events/Event';
import { Link } from '@components/home/Events/Event/Links';

import { graphql, useStaticQuery } from 'gatsby';
import { css } from 'linaria';

import moment from 'moment';

const query = graphql`
  query {
    satCurrentEvents: allSatCurrentEvent(sort: { fields: date, order: ASC }) {
      edges {
        node {
          id
          speaker
          date(formatString: "YYYY-MM-DD")
          band
          moderation
          links {
            href
            title
          }
          additional_text
          season
          topic
        }
      }
    }
  }
`;

const filter = (eventsData: SATEventsData['satCurrentEvents']) => {
  moment.locale('de');

  const today = moment().startOf('day');
  const future = moment().add(3, 'weeks').startOf('day');
  const $eventsDataClean = eventsData.edges.filter((event) => {
    const eventDate = moment(event.node.date, 'YYYY-MM-DD').startOf('day').add(12, 'hours');
    return eventDate.isBetween(today, future);
  });

  return $eventsDataClean;
};

export default function Events(): JSX.Element {
  const eventsData = useStaticQuery<SATEventsData>(query).satCurrentEvents;

  return (
    <div className={$styles.dates}>
      {filter(eventsData).map(({ node }) => (
        <Event
          key={node.id}
          date={moment(node.date, 'YYYY-MM-DD').format('DD.MM.')}
          speaker={node.speaker}
          subject={node.topic}
          text={node.additional_text}
          band={node.band}
          moderation={node.moderation}
          links={node.links}
        />
      ))}
    </div>
  );
}

const $styles = {
  dates: css`
    padding: 50px;
    padding-top: 0;
    display: flex;
    flex-wrap: wrap;
    max-width: 1080px;
    margin: 0 auto;
    box-sizing: border-box;

    @media (max-width: 420px), screen and (max-height: 420px) {
      padding: 0 25px 50px 25px;
    }
  `,
};

type SATEventsData = {
  satCurrentEvents: {
    edges: SatEventEdge[];
  };
};

type SatEventEdge = {
  node: {
    id: string;

    season: number;
    date: string;
    speaker: string;
    topic: string;
    additional_text: string | null;

    band: string | null;
    moderation: string | null;

    links: Array<Link> | null;
    sermon_file: SATSermonLink | null;
  };
};

type SATSermonLink = {
  data: {
    full_url: string;
  };
};
