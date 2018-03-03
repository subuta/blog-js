import _ from 'lodash'

export const inject = (ctx, key, value) => {
  if (!ctx) return
  if (!_.get(ctx, 'res.locals')) {
    _.set(ctx, 'res.locals', {})
  }
  // mutate ctx and set reference of value.
  ctx.res.locals[key] = value
}

export const extract = (ctx, key) => {
  if (!ctx || !ctx.res) return
  return _.get(ctx, ['res', 'locals', key])
}
