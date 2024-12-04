import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Monorepo Documentation',
    description: 'Documentation for our full-stack monorepo',
    siteUrl: 'https://your-site.com',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
  flags: {
    DEV_SSR: true,
  },
  developMiddleware: (app) => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    });
  },
};

export default config;
