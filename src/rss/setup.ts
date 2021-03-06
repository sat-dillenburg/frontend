import { QueryData, QueryFeedData } from './queries';

type Options = {
  query: QueryData & QueryFeedData;
  [key: string]: unknown;
};

const description =
  'Hier findest du alle Predigten zum SAT. Der SAT (Sonntagabendtreff) ist ein überkonfessioneller Jugendgottesdienst. Gemeinsam wollen wir die Bibel verstehen, Gott begegnen und lernen, erfüllt zu leben.';

export default (options: Options): Options => {
  // eslint-disable-next-line prettier/prettier
  const itunesOwner = [
    { 'itunes:name': 'Sat Dillenburg' },
    { 'itunes:email': 'podcast@sat-dill.de' },
  ];

  const itunesKeywords =
    'Kirche, Bibel, Gemeinde, Dillenburg, SAT Dillenburg, SAT, Sonntagabendtreff, Jesus, Gott, Leben';

  const itunesImage = [{ _attr: { href: `${options.query.site.siteMetadata.siteUrl}/public/podcast_cover.png` } }];

  // eslint-disable-next-line prettier/prettier
  const categoryReligion = [
    { _attr: { text: 'Religion & Spirituality' } },
    { 'itunes:category': { _attr: { text: 'Religion' } } },
  ];

  // eslint-disable-next-line prettier/prettier
  const categoryChristianity = [
    { _attr: { text: 'Religion & Spirituality' } },
    { 'itunes:category': { _attr: { text: 'Christianity' } } },
  ];

  return {
    ...options,

    title: 'SAT Dillenburg | Audio-Podcast',
    description,
    feed_url: `${options.query.site.siteMetadata.siteUrl}/podcast.xml`,
    site_url: `${options.query.site.siteMetadata.siteUrl}`,
    image_url: `${options.query.site.siteMetadata.siteUrl}/public/podcast_cover.png`,
    docs: 'http://www.rssboard.org/rss-specification',
    webMaster: 'Silas Rosenkranz',
    copyright: '2006 SAT Dillenburg',
    language: 'de',
    categories: ['Religion & Spirituality', 'Religion', 'Christianity'],
    ttl: '60',

    lastBuildDate: Date.now(),
    generator: 'gatsby-plugin-feed',

    custom_namespaces: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    },

    custom_elements: [
      { 'itunes:author': 'SAT Dillenburg' },
      { 'itunes:category': categoryReligion },
      { 'itunes:category': categoryChristianity },
      { 'itunes:explicit': 'clean' },
      { 'itunes:image': itunesImage },
      { 'itunes:keywords': itunesKeywords },
      { 'itunes:owner': itunesOwner },
      { 'itunes:summary': description },
    ],
  };
};
