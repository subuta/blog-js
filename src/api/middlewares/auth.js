import jwt from 'koa-jwt'
import jwksRsa from 'jwks-rsa'
import { User } from '../../model'

// add getCurrentUser method.
export const getCurrentUser = (ctx, next) => {
  ctx.state.getCurrentUser = () => User.find({where: {auth0Id: ctx.state.user.sub}})
  return next()
}

let jwksUri = `https://${process.env.AUTH0_API_IDENTIFIER}/.well-known/jwks.json`
let opts = {
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_API_IDENTIFIER}/`
}

if (process.env.NODE_ENV === 'test') {
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
