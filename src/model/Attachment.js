import sequelize, { fixSchema } from 'src/utils/sequelize'

const Sequelize = sequelize.constructor

const Attachment = sequelize.define('attachments', fixSchema({
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

// register associations
Attachment.register = (models) => {
}

export default Attachment
