/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  pathPrefix: '/frontend',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: path.resolve(__dirname, 'src', 'assets', 'images'),
      },
    },

    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    'gatsby-plugin-typescript',
    'gatsby-plugin-linaria',
  ],
};
