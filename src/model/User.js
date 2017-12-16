import sequelize, { fixSchema } from 'src/utils/sequelize'

const Sequelize = sequelize.constructor

const User = sequelize.define('user', fixSchema({
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

export default User
