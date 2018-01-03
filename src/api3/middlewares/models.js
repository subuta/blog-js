import models from 'src/model'

export default (ctx, next) => {
  // expose Objection.js models to context.
  ctx.state.models = models
  return next()
}
