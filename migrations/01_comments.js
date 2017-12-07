import Promise from 'bluebird'

export default {
  up: (query, DataTypes) => {
    return query.createTable('comments', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.TEXT
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  down: (query, DataTypes) => {
    return query.dropTable('comments')
  }
}
