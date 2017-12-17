import _ from 'lodash'
import Promise from 'bluebird'
import load from 'src/model'
import requireGlob from 'require-glob'
import path from 'path'

import { ROOT_DIR } from '../../config'

export default async function loadFixtures () {
  const models = await load()
  const FIXTURES_DIR = path.join(ROOT_DIR, 'test/fixtures')
  const fixtures = await requireGlob([path.join(FIXTURES_DIR, '**/*.js')])

  return Promise.map(_.values(fixtures), async loadFixture => {
    const fn = _.isFunction(loadFixture.default) ? loadFixture.default : loadFixture
    return fn(models)
  })
}
