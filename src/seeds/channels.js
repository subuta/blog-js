exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('channels').del()
    .then(function () {
      // Inserts seed entries
      return knex('channels').insert([
        {id: 1, name: 'i_subuta'},
        {id: 2, name: 'react'},
        {id: 3, name: 'redux'}
      ])
    })
}
