exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('reactions').del()
}
