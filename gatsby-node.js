/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { default: slugify } = require('slugify');

const TOKEN = '9e51a63c430da1afc2d8ff682beb2f';
const URI_BASE = 'https://sat.gtnr.de';
const URI_API_BASE = `${URI_BASE}/api`;
const URI_STORAGE_BASE = `${URI_BASE}/storage`;

const cockpitApi = (action) => `${URI_API_BASE}/${action}?token=${TOKEN}`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`src/page-templates/page.tsx`);
  const result = await graphql(`
    query loadPagesQuery {
      allSatPage {
        edges {
          node {
            title
            content
            id
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
      path: `page/${edge.node.id}`,
      component: pageTemplate,
      context: {
        title: edge.node.title,
        content: edge.node.content.replace(/\/storage/g, URI_STORAGE_BASE),
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
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@pages': path.resolve(__dirname, 'src', 'pages'),
        '@page-templates': path.resolve(__dirname, 'src', 'page-templates'),
        '@styles': path.resolve(__dirname, 'src', 'styles'),
      },
    },
  });
};

exports.onCreateNode = async ({ node, actions: { createNode }, store, cache, createNodeId }) => {
  if (node.internal.type === 'SATInterim') {
    const fileNode = await createRemoteFileNode({
      url: `${URI_BASE}/${node.news_image.path}`,
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
  await createSATEventNodes(props);
};

const createSATInterimNode = async (props) => {
  const { createNode } = props.actions;

  const satInterimData = () =>
    axios.post(cockpitApi('singletons/get/satinterim'), {
      populate: 1,
    });

  const res = await satInterimData();

  const satInterimNode = {
    id: 'sat-interim',

    parent: `__SOURCE__`,
    children: [],

    internal: {
      type: `SATInterim`,
    },

    ...res.data,
  };

  const nodeString = JSON.stringify(satInterimNode);
  const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

  satInterimNode.internal.contentDigest = contentDigest;
  createNode(satInterimNode);
};

const createSATPageNodes = async (props) => {
  const { createNode } = props.actions;

  const satPageData = () =>
    axios.post(cockpitApi('collections/get/blog'), {
      populate: 1,
      limit: 0,
    });

  const res = await satPageData();

  for (let i = 0; i < res.data.entries.length; i++) {
    const satPage = res.data.entries[i];
    const satPageNode = {
      id: slugify(satPage.title).toLowerCase(),

      parent: `__SOURCE__`,
      children: [],

      internal: {
        type: `SATPage`,
      },

      ...satPage,
    };

    const nodeString = JSON.stringify(satPageNode);
    const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

    satPageNode.internal.contentDigest = contentDigest;
    createNode(satPageNode);
  }
};

const createSATEventNodes = async (props) => {
  const { createNode } = props.actions;

  const satEventsData = () =>
    axios.post(cockpitApi('collections/get/dates'), {
      populate: 1,
      limit: 0,
    });

  const res = await satEventsData();

  for (let i = 0; i < res.data.entries.length; i++) {
    const satEvent = res.data.entries[i];
    satEvent.links = typeof satEvent.links === 'string' ? [] : satEvent.links;

    const satEventNode = {
      id: satEvent._id,

      parent: `__SOURCE__`,
      children: [],

      internal: {
        type: `SATEvent`,
      },

      ...satEvent,
    };

    const nodeString = JSON.stringify(satEventNode);
    const contentDigest = crypto.createHash(`md5`).update(nodeString).digest(`hex`);

    satEventNode.internal.contentDigest = contentDigest;
    createNode(satEventNode);
  }
};
