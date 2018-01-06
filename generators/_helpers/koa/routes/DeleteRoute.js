import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, config} = props
  const {
    eager = ''
  } = config
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return Base(
    {...props, path: '/:id', method: 'delete'},
    build`
      await ${Model}.query().delete().where({id: ctx.params.id})
      ctx.body = null
    `
  )
}
