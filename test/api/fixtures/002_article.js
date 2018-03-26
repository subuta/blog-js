exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 14129,
      title: 'Plastic Shoes expedite',
      summary: 'Auto Loan Account',
      isPublished: false,
      content:
        'Veniam fuga provident. Et consequuntur qui iure quam cumque impedit. Sed quidem dolorem deleniti assumenda earum suscipit sed sapiente rerum. Eius optio nostrum. Doloremque ut dolores ullam sunt occaecati unde hic.'
    },
    {
      id: 85002,
      title: 'online sky blue Towels',
      summary: 'back-end monitor JBOD',
      isPublished: false,
      content:
        'Voluptatibus neque iusto deserunt voluptatem. Aspernatur qui harum dolorem sit. Consequuntur qui possimus aut quo eius ipsam natus et excepturi. Commodi eligendi dolores. Est eligendi soluta accusamus omnis voluptatem ut voluptatem labore.'
    },
    {
      id: 73427,
      title: 'Gorgeous Plastic Shirt Intelligent Chair',
      summary: 'teal',
      isPublished: true,
      content:
        'Accusantium eaque sunt vel. Est consequatur illum. Vero sint at. Reprehenderit consequatur sunt consequatur est quos consequuntur quia sint perspiciatis.'
    }
  ])
}
