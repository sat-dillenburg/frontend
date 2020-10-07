import React from 'react';
import { css } from 'linaria';

import Event from '@components/home/Events/Event';
import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query {
    satEvents: allSatEvent(filter: { show: { eq: true } }, sort: { fields: date, order: ASC }) {
      edges {
        node {
          id
          title
          text
          speaker
          date(formatString: "DD.MM.")
          band
          moderation
          links {
            value {
              link
              title
            }
          }
        }
      }
    }
  }
`;

export default function Events(): JSX.Element {
  const datesData = useStaticQuery<SATEventsData>(query).satEvents;

  return (
    <div className={$styles.dates}>
      {datesData.edges.map(({ node }) => (
        <Event
          key={node.id}
          date={node.date}
          speaker={node.speaker}
          subject={node.title}
          text={node.text}
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
  satEvents: {
    edges: SatEventEdge[];
  };
};

type SatEventEdge = {
  node: {
    id: string;
    title: string;
    text: string;
    speaker: string;
    date: string;
    band: string;
    moderation: string;
    links: SATEventLink[];
  };
};

type SATEventLink = {
  value: {
    link: string;
    title: string;
  };
};
