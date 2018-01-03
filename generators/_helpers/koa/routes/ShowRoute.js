import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  const {model} = props
  const Model = _.upperFirst(pluralize.singular(model))

  return Base(
    {...props, path: '/:id'},
    build`
      ctx.body = await ${Model}
        .query()
        .eager('')
        .findFirst({id: ctx.params.id})
    `
  )
}
