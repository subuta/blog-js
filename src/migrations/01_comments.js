import Promise from 'bluebird'
import Comment from 'src/model/Comment'

export default {
  up: async (query, Sequelize) => {
    await query.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      channelId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      commentedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      attachmentId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      text: {
        type: Sequelize.TEXT,
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
    return query.dropTable('comments')
  }
}
