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

    await Comment.bulkCreate([{
      text: 'hoge'
    }, {
      text: 'fuga'
    }])
  },
  down: async (query, Sequelize) => {
    return query.dropTable('comments')
  }
}
