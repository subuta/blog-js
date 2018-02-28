module.exports = {
  publicRuntimeConfig: { // Will be available on both server and client
    staticFolder: '/static'
  },
  // https://github.com/zeit/next.js/issues/706
  // the modules needs to be transpiled by babel.
  transpileModules: []
}
