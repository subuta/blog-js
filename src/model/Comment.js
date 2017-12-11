import sequelize from 'src/utils/sequelize'
import Channel from './Channel'

const Sequelize = sequelize.constructor

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: Sequelize.TEXT
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

// associations
Comment.belongsTo(Channel)

export default Comment
