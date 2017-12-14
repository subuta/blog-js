import Promise from 'bluebird'

export default {
  up: async (query, Sequelize) => {
    await query.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      auth0Id: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
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
    })
  },
  down: async (query, Sequelize) => {
    return query.dropTable('users')
  }
}
