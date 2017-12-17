import _ from 'lodash'
import Promise from 'bluebird'
import requireGlob from 'require-glob'
import path from 'path'
import { ROOT_DIR } from '../../config'

export const runMigration = async (knex) => {
  return knex.migrate.latest()
}

export default async function runSeed (knex) {
  const FIXTURES_DIR = path.join(ROOT_DIR, 'test/fixtures')
  const fixtures = await requireGlob([path.join(FIXTURES_DIR, '**/*.js')])

  return Promise.map(_.values(fixtures), async fn => {
    if (fn.seed) {
      fn = fn.seed
    }
    return fn(knex)
  })
}
