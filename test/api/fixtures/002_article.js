exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 35666,
      title: 'Refined Rubber Tuna user-centric expedite',
      summary: 'monitor Armenian Dram enhance',
      slug: 'velit-voluptatibus-incidunt',
      isPublished: false,
      content:
        'Beatae voluptatem voluptatem ut temporibus quia. Id perferendis aperiam et mollitia debitis et nihil et. Explicabo eligendi mollitia cumque eius quas illo rerum accusamus veritatis. Rerum sed nesciunt. Maxime assumenda molestiae enim est perspiciatis aperiam amet quas. Maxime veritatis vitae maxime rerum beatae laborum cupiditate.',
      authorId: 75900
    },
    {
      id: 60920,
      title: 'Tanzania',
      summary: 'copy',
      slug: 'ea-voluptatem-voluptatem',
      isPublished: true,
      content:
        'Fuga molestiae totam eveniet. Cum est veritatis facilis qui rem voluptate omnis molestiae possimus. Sit sapiente quaerat non aperiam sed rerum. Repellendus quas et laborum alias assumenda laboriosam eligendi.',
      authorId: 1796
    },
    {
      id: 66239,
      title: 'Ergonomic Wooden Sausages 1080p Sleek Plastic Mouse',
      summary: 'Gibraltar Sleek Cotton Tuna portal',
      slug: 'illo-sequi-dolores',
      isPublished: false,
      content:
        'Deleniti et non quaerat explicabo. Mollitia est cumque fugit consequatur debitis itaque nihil sit. Voluptatem animi laudantium sit quis tempore cumque voluptatum consequuntur. Aut sed quia sit.',
      authorId: 25425
    }
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
