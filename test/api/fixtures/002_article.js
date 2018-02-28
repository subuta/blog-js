exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 36084,
      title: 'Pound Sterling User-centric',
      content:
        'Enim aliquam hic aut porro quisquam repudiandae nemo. Fugiat placeat unde. Et assumenda alias voluptatem qui delectus eius. Et ad non asperiores cum molestias.'
    },
    {
      id: 6898,
      title: 'Visionary',
      content:
        'Maiores provident aliquam sit. Veritatis molestiae aspernatur aut. Nostrum sit voluptatem ex neque eligendi est ad est dolores.'
    },
    {
      id: 14780,
      title: 'navigating',
      content:
        'In quod dignissimos enim et et quasi dolor qui. Dicta dicta ipsa dignissimos. Consequatur tempora perferendis alias velit praesentium minus tenetur ut.'
    }
  ])
}
