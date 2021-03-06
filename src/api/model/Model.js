import _ from 'lodash'
import {Model} from 'objection'
import visibilityPlugin from 'objection-visibility'
import ajvValidator from 'src/api/utils/ajvValidator'

// apply plugins to Objection.js Model.
// https://github.com/oscaroox/objection-visibility
const compose = _.flow([visibilityPlugin])

// Based on https://github.com/Vincit/objection.js/blob/master/examples/plugin/index.js
// Base Model class

class CustomQueryBuilder extends Model.QueryBuilder {
  async findFirst(params) {
    return _.first(await this.where(params))
  }

  async findOrCreate(params) {
    const {where, defaults} = params
    const found = await this.findFirst(where)
    if (found) return found
    return await this.insert(defaults)
  }
}

export default class extends compose(Model) {
  static QueryBuilder = CustomQueryBuilder

  static createValidator() {
    // https://github.com/Vincit/objection.js/issues/549
    // NOTE: createValidator() is inherited in all models extending `BaseModel`
    // and returns the same instance of `validator`
    return ajvValidator
  }

  static namedFilters = {
    default: (builder) => builder
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}
