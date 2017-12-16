import sequelize, { fixSchema } from 'src/utils/sequelize'

const Sequelize = sequelize.constructor

const Channel = sequelize.define('channel', fixSchema({
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
Channel.register = (models) => {
  Channel.hasMany(models.Comment)
}

export default Channel
