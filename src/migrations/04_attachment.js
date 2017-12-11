import Promise from 'bluebird'
import Channel from 'src/model/Channel'

export default {
  up: async (query, Sequelize) => {
    await query.createTable('attachments', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        isUrl: true,
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
    })
  },
  down: async (query, Sequelize) => {
    return query.dropTable('attachments')
  }
}
