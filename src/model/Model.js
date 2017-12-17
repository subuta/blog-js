import _ from 'lodash'
import { Model } from 'objection'
// Based on https://github.com/Vincit/objection.js/blob/master/examples/plugin/index.js
// Base Model class

class CustomQueryBuilder extends Model.QueryBuilder {
  async findFirst (params) {
    return _.first(await this.where(params))
  }

  async findOrCreate (params) {
    const {where, defaults} = params
    const found = await this.findFirst(where)
    if (found) return found
    return await this.insert(defaults)
  }
}

export default class extends Model {
  static QueryBuilder = CustomQueryBuilder
}
