import { fixSchema } from 'src/utils/sequelize'

export default {
  up: async (query, Sequelize) => {
    await query.createTable('attachments', fixSchema({
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
    }))
  },
  down: async (query, Sequelize) => {
    return query.dropTable('attachments')
  }
}
