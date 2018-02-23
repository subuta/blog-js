exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 6898,
      title: 'Designer',
      content:
        'Nesciunt veritatis molestiae. Aut itaque nostrum. Voluptatem ex neque eligendi. Ad est dolores occaecati quis rerum ullam magni.'
    },
    {
      id: 14780,
      title: 'scale e-tailers optical',
      content:
        'Qui dolorem dicta dicta. Dignissimos eum consequatur. Perferendis alias velit praesentium.'
    },
    {
      id: 36084,
      title: 'dedicated Accountability monitor',
      content:
        'Aut fugiat placeat unde deserunt. Assumenda alias voluptatem qui. Eius esse et ad non asperiores cum molestias repellendus consequatur. Blanditiis voluptas repellat temporibus. Ab voluptatem dolorum doloribus aperiam et officia aut necessitatibus. Ut repellendus aut eum beatae et numquam.'
    }
  ])
}
