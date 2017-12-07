import Promise from 'bluebird'

export default {
  up: async (query, DataTypes) => {
    await query.createTable('comments', {
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
      }
    })

    return query.bulkInsert('comments', [{
      comment: 'hoge',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      comment: 'fuga',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async (query, DataTypes) => {
    return query.dropTable('comments')
  }
}
