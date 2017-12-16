import { fixSchema } from 'src/utils/sequelize'

export default {
  up: async (query, Sequelize) => {
    await query.createTable('users', fixSchema({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      auth0Id: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ja'
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      avatar: {
        type: Sequelize.STRING,
        isUrl: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }))
  },
  down: async (query, Sequelize) => {
    return query.dropTable('users')
  }
}
