import Umzug from 'umzug'
import sequelize from '../src/utils/sequelize'

import { MIGRATION_DIR, DB_DIR } from '../config'
import path from 'path'

const umzug = new Umzug({
  // The path to the json storage.
  storage: 'json',
  storageOptions: {
    path: path.join(DB_DIR, './sequelize-meta.json'),
  },
  migrations: {
    // The path to the migrations directory.
    path: MIGRATION_DIR,
    pattern: /\.js$/,
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor // DataTypes
    ]
  }
})

const run = async ([action]) => {
  const up = () => umzug.up().then(function (migrations) {
    // "migrations" will be an Array with the names of the
    // executed migrations.
    console.log('migrations = ', migrations)
  })

  if (action === 'migrate') {
    await up()
  } else if (action === 'reset') {
    await umzug.down({to: 0}) // rollback all migration
    await up()
  }

  process.exit(0)
}

// call run with CLI arguments
run(process.argv.slice(2))
