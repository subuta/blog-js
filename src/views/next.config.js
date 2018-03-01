const webpack = require('webpack');

require('dotenv').config({path: '../../.env'})

module.exports = {
  // https://gist.github.com/remy/6bb7beccc6355cafa7eac64f46467c66
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  },

  publicRuntimeConfig: { // Will be available on both server and client
    staticFolder: '/static'
  },
  // https://github.com/zeit/next.js/issues/706
  // the modules needs to be transpiled by babel.
  transpileModules: []
}
