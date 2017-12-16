const path = require('path')
const babel = require('babel-core')

module.exports = function (wallaby) {
  return {
    files: [
      'config.js',
      'src/**/*.js',
      'test/helper/**/*.js',
      'test/fixtures/**/*'
    ],

    tests: [
      'test/**/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'LOG_QUERIES=true;POSTGRES_DB=blog-js-test;NODE_ENV=test;NODE_PATH=' + path.join(wallaby.projectCacheDir, '../')
      }
    },

    workers: {
      initial: 1,
      regular: 1
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel,
        babelrc: true,
        plugins: [
          ['module-resolver',
            {
              root: ['./'],
              alias: {
                test: './test',
              }
            }
          ]
        ]
      })
    },

    testFramework: 'ava',

    setup: function () {
      require('babel-register')({
        only: [
          '/node_modules/jwks-rsa'
        ]
      })
    }
  }
}
