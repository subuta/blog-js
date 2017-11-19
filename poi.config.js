const _ = require('lodash')
const path = require('path')

// setting for building docs
module.exports = (options, req) => ({
  entry: './src/index.js',
  dist: 'public',
  homepage: '/blog-js/',
  presets: [
    require('poi-preset-react')(options)
  ],

  transformModules: [],

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
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
