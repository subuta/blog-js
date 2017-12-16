const path = require('path')
const babel = require('babel-core')

module.exports = function (wallaby) {
  return {
    files: [
      'config.js',
      'src/**/*.js'
    ],

    tests: [
      'test/**/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'NODE_ENV=test;NODE_PATH=' + path.join(wallaby.projectCacheDir, '../')
      }
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
              },
            },
          ],
        ],
      }),
    },

    testFramework: 'ava',

    setup: function () {
      require('babel-register')
    }
  }
}
