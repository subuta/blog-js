import _ from 'lodash'
import Promise from 'bluebird'
import { loadFiles } from 'sequelize-fixtures'
import models from 'src/model'

export default async (files, isSync = false) => {
  if (_.isString(files)) {
    files = [files]
  }

  // truncate all tables
  await Promise.map(_.values(models), (model) => {
    if (isSync) {
      return model.sync({force: true})
    }
    return model.destroy({truncate: true, cascade: true})
  }, { concurrency: isSync ? 1 : 10 })

  return loadFiles(files, models)
}
