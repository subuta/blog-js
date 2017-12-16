import _ from 'lodash'
import Promise from 'bluebird'
import { loadFiles } from 'sequelize-fixtures'
import models from 'src/model'

export default async (files) => {
  if (_.isString(files)) {
    files = [files]
  }

  // truncate all tables
  await Promise.map(_.values(models), (model) => model.sync({force: true}))

  return loadFiles(files, models)
}
