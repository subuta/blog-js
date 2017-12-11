import sequelize from 'src/utils/sequelize'

const Sequelize = sequelize.constructor

const Attachment = sequelize.define('attachments', {
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

// register associations
Attachment.register = (models) => {
  Attachment.belongsTo(models.Comment)
}

export default Attachment
