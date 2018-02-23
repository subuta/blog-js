exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('channels').insert([
    {id: 31156, name: 'Latvian Lats Iraqi Dinar Grocery'},
    {id: 54787, name: 'Legacy Assurance Island'},
    {id: 99821, name: 'back up disintermediate'}
  ])
}
