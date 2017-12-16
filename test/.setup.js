require('babel-register')({
  only: [
    '/config.js',
    '/src',
    '/test',
    '/node_modules/jwks-rsa'
  ]
})
