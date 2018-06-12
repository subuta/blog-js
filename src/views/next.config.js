const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')

require('dotenv').config({path: '../../.env'})

const rootPath = path.resolve(process.cwd(), '../../')

module.exports = {
  // https://gist.github.com/remy/6bb7beccc6355cafa7eac64f46467c66
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    // for bundle size check
    // https://github.com/zeit/next.js/tree/master/examples/with-webpack-bundle-size-analyzer
    if (process.env.ANALYZE) {
      config.plugins.push(
        new WebpackBundleSizeAnalyzerPlugin(path.resolve(rootPath, './webpack-stats.txt'))
      )
    }

    // add resolve.root to project root.
    const node_modules = [
      ..._.get(config, 'resolve.modules', []),
      rootPath
    ]

    config = _.set(config, 'resolve.modules', node_modules)

    return config;
  },

  publicRuntimeConfig: { // Will be available on both server and client
    staticFolder: '/static',
    baseUrl: process.env.BASE_URL,
    fbAppId: process.env.FB_APP_ID,
    twitterSite: process.env.TWITTER_SITE,
    segmentWriteKey: process.env.SEGMENT_WRITE_KEY
  },
  // https://github.com/zeit/next.js/issues/706
  // the modules needs to be transpiled by babel.
  transpileModules: []
}
