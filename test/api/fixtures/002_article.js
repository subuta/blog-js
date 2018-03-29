exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 76958,
      title: 'HDD cross-platform core',
      summary: 'Cambridgeshire',
      slug: 'accusantium-non-fugiat',
      isPublished: true,
      content:
        'Doloremque eveniet aut corporis sunt autem nihil quia. Velit modi mollitia sit nulla. Corrupti est deserunt sed dolores deserunt. Ut corporis qui. Sunt dolor culpa corporis error.'
    },
    {
      id: 75213,
      title: 'blue',
      summary: 'online',
      slug: 'ut-sunt-asperiores',
      isPublished: true,
      content:
        'Sapiente voluptatem enim ipsa. Sequi quod quos dolorem saepe dignissimos. Commodi molestiae corporis sequi quo non est nihil rerum ut. Minus maiores illo.'
    },
    {
      id: 52552,
      title: 'cyan implementation',
      summary: 'Benin Tuna Wyoming',
      slug: 'mollitia-soluta-iure',
      isPublished: true,
      content:
        'Animi nobis aliquam non. Non iusto exercitationem. Est iste architecto a expedita ut. Facilis voluptas commodi consectetur eius. Asperiores amet praesentium quas consequuntur perferendis.'
    }
  ])
}
