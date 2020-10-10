export const query = `
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export type QueryData = {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
};

export const queryFeed = `
  {
    allSatEvent(sort: { order: DESC, fields: date }) {
      nodes {
        id

        season
        date
        speaker
        topic

        additional_text
        sermon_file {
          filesize
          duration
          data {
            full_url
          }
        }
      }
    }
  }
`;

export type SATEventNode = {
  id: string;

  season: number;
  date: number;
  speaker: string;
  topic: string;

  additional_text: string | null;
  sermon_file: {
    duration: number;
    filesize: number;

    data: {
      full_url: string;
    };
  } | null;
};

export type QueryFeedData = {
  allSatEvent: {
    nodes: Array<SATEventNode>;
  };
};
