import { fixSchema } from 'src/utils/sequelize'
import Channel from 'src/model/Channel'

export default {
  up: async (query, Sequelize) => {
    await query.createTable('channels', fixSchema({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }))

    await Channel.bulkCreate([{
      name: 'i_subuta'
    }, {
      name: 'react'
    }, {
      name: 'redux'
    }])
  },
  down: async (query, Sequelize) => {
    return query.dropTable('channels')
  }
}
