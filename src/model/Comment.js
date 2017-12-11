import sequelize from 'src/utils/sequelize'

const Sequelize = sequelize.constructor

const Comment = sequelize.define('comment', {
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
  attachmentId: {
    type: Sequelize.STRING,
    allowNull: true
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

// register associations
Comment.register = (models) => {
  Comment.belongsTo(models.Channel)
  Comment.hasOne(models.Attachment)
}

export default Comment
