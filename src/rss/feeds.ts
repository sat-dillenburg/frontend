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
          `Thema: ${node.topic}` +
          (node.additional_text ? ` | ${node.additional_text}<br>` : `<br>`) +
          `Sprecher: ${node.speaker}`;

        return {
          title: node.topic,
          description,
          link: node.sermon_file?.data.full_url,
          author: `${node.speaker} @ SAT Dillenburg`,
          categories: ['Religion & Spirituality', 'Religion', 'Christianity'],
          url: node.sermon_file?.data.full_url,
          guid: node.id,
          date: node.date,

          custom_elements: [
            { 'itunes:author': `${node.speaker} @ SAT Dillenburg` },
            { 'itunes:duration': formatDuration(node.sermon_file?.duration) },
            { 'itunes:explicit': 'clean' },
            { 'itunes:image': `${site.siteMetadata.siteUrl}/public/logo.png` },
            { 'itunes:keywords': '' },
            { 'itunes:summary': description },
            { enclosure: enclosure },
          ],
        };
      });

      return sermons;
    },
  },
];
