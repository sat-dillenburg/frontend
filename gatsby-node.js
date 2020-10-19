/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const crypto = require('crypto');

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const DirectusSDK = require('@directus/sdk-js').default;
const Vibrant = require('node-vibrant');

const config = require('./gatsby-config');

const directusApi = new DirectusSDK({
  url: config.siteMetadata.directus.url,
  project: config.siteMetadata.directus.project,
  token: process.env.DIRECTUS_TOKEN,
});

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`src/pages/p.tsx`);
  const result = await graphql(`
    query loadPagesQuery {
      allSatPage {
        edges {
          node {
            title
            content
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allSatPage.edges.forEach((edge) => {
    createPage({
      path: `p/${edge.node.slug}`,
      component: pageTemplate,
      context: {
        title: edge.node.title,
        content: edge.node.content,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src', 'assets'),
        '@hooks': path.resolve(__dirname, 'src', 'hooks'),
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@pages': path.resolve(__dirname, 'src', 'pages'),
        '@styles': path.resolve(__dirname, 'src', 'styles'),
      },
    },
  });
};

exports.onCreateNode = async (props) => {
  await populateSATInterimWithFile(props);
  await populateImageWithColors(props);
};

const populateImageWithColors = async (props) => {
  const { node } = props;
  const validMimeTypes = ['image/jpeg', 'image/png'];

  const isFile = node.internal.type === 'File';
  const isImage = isFile && validMimeTypes.includes(node.internal.mediaType);

  if (isImage) {
    await Vibrant.from(node.absolutePath).getPalette((err, palette) => {
      const colors = {
        vibrant: palette.Vibrant.getHex(),
        darkVibrant: palette.DarkVibrant.getHex(),
        lightVibrant: palette.LightVibrant.getHex(),
        muted: palette.Muted.getHex(),
        darkMuted: palette.DarkMuted.getHex(),
        lightMuted: palette.LightMuted.getHex(),
      };

      node.colorPalette = colors;
    });
  }
};

const populateSATInterimWithFile = async (props) => {
  const { node, actions, store, cache, createNodeId } = props;
  const { createNode } = actions;

  if (node.internal.type === 'SATInterim') {
    const fileNode = await createRemoteFileNode({
      url: node.news_image.data.full_url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    });
    if (fileNode) {
      node.news_image_file___NODE = fileNode.id;
    }
  }
};

exports.sourceNodes = async (props) => {
  await createSATInterimNode(props);
  await createSATPageNodes(props);
  await createSATCurrentEventNodes(props);
  await createSATEventNodes(props);
};

const filterId = (value) => {
  if (typeof value === 'object' && value.id) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = value;
    return rest;
  }

  return value;
};

const createSATInterimNode = async (props) => {
  const { createNode } = props.actions;

  const res = await directusApi.getItem('sat_interim', 1, { fields: '*.*' });

  const satInterimDataRaw = res.data;
  const satInterimDataEntries = Object.entries(satInterimDataRaw);

  const satInterimDataFiltered = {};

  for (let i = 0; i < satInterimDataEntries.length; i += 1) {
    const [key, value] = satInterimDataEntries[i];
    satInterimDataFiltered[key] = filterId(value);
  }

  const satInterimNode = {
    ...satInterimDataFiltered,

    id: 'sat-interim',

    parent: `__SOURCE__`,
    children: [],

    internal: {
      type: `SATInterim`,
    },
  };

  const nodeString = JSON.stringify(satInterimNode);
  const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

  satInterimNode.internal.contentDigest = contentDigest;
  createNode(satInterimNode);
};

const createSATPageNodes = async (props) => {
  const { createNode } = props.actions;

  const res = await directusApi.getItems('pages', { fields: '*.*', limit: -1 });
  const satPagesDataRaw = res.data;

  for (let i = 0; i < satPagesDataRaw.length; i += 1) {
    const satPage = satPagesDataRaw[i];
    const satPageNode = {
      ...satPage,

      id: satPage.slug,
      parent: `__SOURCE__`,
      children: [],
      internal: {
        type: `SATPage`,
      },
    };

    const nodeString = JSON.stringify(satPageNode);
    const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

    satPageNode.internal.contentDigest = contentDigest;
    createNode(satPageNode);
  }
};

const createSATEventNodes = async (props) => {
  const { createNode, createTypes } = props.actions;

  createTypes(`
    type SermonFileData {
      asset_url: String
      full_url: String
      url: String
    }

    type SermonFile {
      charset: String
      checksum: String
      data: SermonFileData
      description: String
      duration: Int
      filename_disk: String
      filesize: Int
      filename_download: String
      id: Int
      location: String
      private_hash: String
      storage: String
      title: String
      type: String
      uploaded_by: Int
      uploaded_on: Date @dateformat
    }

    type Link {
      href: String
      title: String
    }

    type SATEvent implements Node {
      season: String!
      date: Date! @dateformat
      speaker: String!
      topic: String!

      links: [Link]
      additional_text: String
      moderation: String
      band: String
      sermon_file: SermonFile
    }
  `);

  const res = await directusApi.getItems('events', { fields: '*.*', limit: -1 });
  const satEventsDataRaw = res.data;

  for (let i = 0; i < satEventsDataRaw.length; i++) {
    const satEvent = satEventsDataRaw[i];

    const satEventNode = {
      ...satEvent,

      id: `event-${satEvent.id}`,
      parent: `__SOURCE__`,
      children: [],
      internal: {
        type: `SATEvent`,
      },
    };

    const nodeString = JSON.stringify(satEventNode);
    const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

    satEventNode.internal.contentDigest = contentDigest;
    createNode(satEventNode);
  }
};

const createSATCurrentEventNodes = async (props) => {
  const { createNode, createTypes } = props.actions;

  createTypes(`
    type SermonFileData {
      asset_url: String
      full_url: String
      url: String
    }

    type SermonFile {
      charset: String
      checksum: String
      data: SermonFileData
      description: String
      duration: Int
      filename_disk: String
      filesize: Int
      filename_download: String
      id: Int
      location: String
      private_hash: String
      storage: String
      title: String
      type: String
      uploaded_by: Int
      uploaded_on: Date @dateformat
    }

    type Link {
      href: String
      title: String
    }

    type SATCurrentEvent implements Node {
      season: String!
      date: Date! @dateformat
      speaker: String!
      topic: String!

      links: [Link]
      additional_text: String
      moderation: String
      band: String
      sermon_file: SermonFile
    }
  `);

  const res = await directusApi.getItems('events', {
    fields: '*.*',
    limit: -1,
    filter: {
      date: {
        gte: 'now',
      },
    },
  });

  const satEventsDataRaw = res.data;

  for (let i = 0; i < satEventsDataRaw.length; i++) {
    const satEvent = satEventsDataRaw[i];

    const satEventNode = {
      ...satEvent,

      id: `current-event-${satEvent.id}`,
      parent: `__SOURCE__`,
      children: [],
      internal: {
        type: `SATCurrentEvent`,
      },
    };

    const nodeString = JSON.stringify(satEventNode);
    const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

    satEventNode.internal.contentDigest = contentDigest;
    createNode(satEventNode);
  }
};
