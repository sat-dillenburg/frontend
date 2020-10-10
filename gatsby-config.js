/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

const path = require('path');

const { feedOptions } = require('./src/rss/index');

module.exports = {
  pathPrefix: '/frontend',
  siteMetadata: {
    siteUrl: `https://sat-dillenburg.de`,

    directus: {
      url: 'https://admin.sat-dill.de/',
      project: 'sat-dillenburg',
    },
  },

  plugins: [
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: path.resolve(__dirname, 'src', 'assets', 'images'),
      },
    },

    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    `gatsby-plugin-typescript`,
    `gatsby-plugin-linaria`,

    {
      resolve: `gatsby-plugin-feed`,
      options: feedOptions,
    },
  ],
};
