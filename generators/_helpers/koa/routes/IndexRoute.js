import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, config} = props
  const {
    eager = ''
  } = config
  const Model = _.upperFirst(pluralize.singular(model))

  return Base(
    {...props, path: '/'},
    build`
      let params = {}
      
      /* mat Before index [start] */
      /* mat Before index [end] */
    
      ctx.body = await ${Model}
        .query()
        .eager('${eager}')
        .where(params)
    `
  )
}
