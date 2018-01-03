import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['koa-jwt', 'jwt'],
    ['jwks-rsa', 'jwksRsa'],
    ['src/utils/env', 'env']
  ])

  return build`
    ${imports}
    
    // add getCurrentUser method.
    export const getCurrentUser = (ctx, next) => {
      const {User} = ctx.state.models
      ctx.state.getCurrentUser = () => User.query().findFirst({auth0Id: ctx.state.user.sub})
      return next()
    }
    
    let jwksUri = \`https://\$\{env.AUTH0_API_IDENTIFIER\}/.well-known/jwks.json\`
    let opts = {
      // Validate the audience and the issuer.
      audience: env.AUTH0_AUDIENCE,
      issuer: \`https://\$\{env.AUTH0_API_IDENTIFIER\}/\`
    }
    
    if (env.NODE_ENV === 'test') {
      jwksUri = 'http://localhost/.well-known/jwks.json'
      opts = {debug: true}
    }
    
    // https://auth0.com/docs/quickstart/backend/nodejs
    // Middleware below this line is only reached if JWT token is valid
    export default jwt({
      secret: jwksRsa.koaJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri
      }),
      algorithms: ['RS256'],
      ...opts
    })
  `
}
