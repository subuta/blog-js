exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('reactions').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('reactions').insert([
    {
      id: 19824,
      emoji: 'synergize Small Ouguiya',
      reactableId: 78552,
      reactableType: 'plum calculating SCSI',
      reactedById: 83
    },
    {
      id: 24671,
      emoji: 'transmit SQL',
      reactableId: 17443,
      reactableType: 'Mouse back up',
      reactedById: 96532
    },
    {
      id: 42224,
      emoji: 'Comoro Franc',
      reactableId: 77999,
      reactableType: 'Rand Loti Pants Steel',
      reactedById: 48632
    }
  ])
}
