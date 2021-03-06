import moment from 'moment';

import { queryFeed } from './queries';
import type { QueryData, QueryFeedData } from './queries';

type Props = {
  query: QueryData & QueryFeedData;
};

type FeedData = Array<{
  description: string;
}>;

const formatDuration = (duration?: number): string => {
  const $duration = (duration ?? 0) * 1000;
  const mDur = moment.duration($duration);

  const hours = `${mDur.hours()}`.padStart(2, '0');
  const minutes = `${mDur.minutes()}`.padStart(2, '0');
  const seconds = `${mDur.seconds()}`.padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export default [
  {
    query: queryFeed,

    output: '/podcast.xml',
    title: `SAT Dillenburg | Audio-Podcast`,

    serialize: (options: Props): FeedData => {
      const { query } = options;
      const { site, allSatEvent } = query;

      const allEventsWithSermon = allSatEvent.nodes.filter((e) => e.sermon_file !== null);
      const sermons = allEventsWithSermon.map((node) => {
        const enclosure = [
          {
            _attr: {
              url: node.sermon_file?.data.full_url,
              length: node.sermon_file?.filesize,
              type: 'audio/mpeg',
            },
          },
        ];

        const description =
          `${node.topic}` + (node.additional_text ? ` | ${node.additional_text}` : ``) + ` - ${node.speaker}`;

        const itunesImage = [{ _attr: { href: `${site.siteMetadata.siteUrl}/public/podcast_cover.png` } }];

        return {
          title: node.topic,
          description,
          author: `${node.speaker} @ SAT Dillenburg`,
          categories: ['Religion & Spirituality', 'Religion', 'Christianity'],
          // url: site.siteMetadata.siteUrl, -- link to sermon @ sat-dillenburg.de
          guid: node.id,
          date: node.date,

          custom_elements: [
            { 'itunes:author': `${node.speaker} @ SAT Dillenburg` },
            { 'itunes:duration': formatDuration(node.sermon_file?.duration) },
            { 'itunes:explicit': 'clean' },
            { 'itunes:image': itunesImage },
            { 'itunes:keywords': '' },
            { 'itunes:summary': description },
            { enclosure },
          ],
        };
      });

      return sermons;
    },
  },
];
