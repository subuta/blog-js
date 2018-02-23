exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('channels').insert([
    {id: 31156, name: 'International'},
    {id: 99821, name: 'Buckinghamshire Fantastic Cotton Chair invoice'},
    {id: 54787, name: 'capacitor reboot'}
  ])
}
