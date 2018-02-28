const _ = require('lodash')
const path = require('path')

// See: https://github.com/jaredpalmer/backpack/blob/354794b56e05d3b3c11b4128f9648f1a0061550b/packages/backpack-core/config/paths.js
const rootPath = path.resolve(process.cwd())

// See: https://github.com/jaredpalmer/backpack/blob/master/packages/backpack-core/config/webpack.config.js
module.exports = {
  webpack: (config, options, webpack) => {
    const node_modules = [
      path.join(rootPath, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
      '/node_modules', // added for docker
    ]
    config = _.set(config, 'resolve.modules', node_modules)
    config = _.set(config, 'resolveLoader.modules', node_modules)

    config = _.set(config, 'externals', [
      config.externals, // default one
      'sequelize'
    ])

    // configuration
    config = _.set(config, 'entry.main', [path.resolve(__dirname, 'server.js')])
    config = _.set(config, 'output.path', path.resolve(__dirname, 'dist'))
    return config
  }
}
