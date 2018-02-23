exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('comments').insert([
    {
      id: 17123,
      text:
        'Quisquam ut amet ad laboriosam. Animi quia autem est quam iure aut molestiae laborum. Eos reiciendis ratione explicabo atque asperiores reiciendis aut laudantium sit.'
    },
    {
      id: 34300,
      text:
        'Ea quisquam sed et. Vel cumque facere earum repudiandae nam cum ut assumenda occaecati. Eligendi rerum eum. Odit eum necessitatibus nulla ut est tenetur sint non.'
    },
    {
      id: 54783,
      text:
        'Consequuntur quos saepe voluptate quibusdam est et blanditiis aut officiis. Officiis necessitatibus vel reiciendis aut maxime. Facilis voluptas ex aspernatur est. Rerum tenetur eius inventore in eius. Dolor et praesentium molestiae quis sit sed modi recusandae quidem.'
    }
  ])
}
