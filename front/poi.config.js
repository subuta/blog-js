const _ = require('lodash')
const path = require('path')

// load .env
require('dotenv').config()

// setting for building docs
module.exports = (options, req) => ({
  entry: './src/index.js',
  dist: 'public',
  presets: [
    require('poi-preset-react')(options)
  ],

  transformModules: [],

  babel: {
    babelrc: true,
    cacheDirectory: true,
    presets: [
      [require.resolve('babel-preset-poi'), {jsx: 'react'}]
    ]
  },

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  env: {
    AUTH0_API_IDENTIFIER: process.env.AUTH0_API_IDENTIFIER,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  },

  webpack (config) {
    config = _.assign(config, {
      devtool: 'cheap-module-source-map',
      node: {
        module: 'empty',
        fs: 'empty'
      }
    })

    return config
  }
})
