exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 24271,
      title: 'Burkina Faso Distributed redundant',
      summary: 'orchestrate',
      slug: 'ab-qui-repellat',
      isPublished: true,
      content:
        'Ipsa incidunt sed quia expedita. Voluptas accusantium alias dolorem voluptas nostrum. Ipsum recusandae esse aperiam eum vero sunt dolores impedit. Et dignissimos provident incidunt. Corporis est est assumenda possimus quas natus praesentium.',
      authorId: 61127
    },
    {
      id: 48587,
      title: 'Street e-tailers',
      summary: 'Cove',
      slug: 'et-qui-modi',
      isPublished: true,
      content:
        'Neque consequatur aspernatur porro. Dolorem quasi doloribus tempora quidem reiciendis. Illo quidem nemo blanditiis sunt amet ullam suscipit.',
      authorId: 41841
    },
    {
      id: 67738,
      title: 'Architect Program',
      summary: 'Minnesota recontextualize River',
      slug: 'ipsam-animi-rerum',
      isPublished: true,
      content:
        'Iste et in perspiciatis ut eum quae magni. Impedit placeat minus veniam modi eius et odit voluptates facere. Sequi a esse. Occaecati eos aut dignissimos suscipit sed voluptates quia. Et numquam officia quaerat accusamus quisquam doloremque. Doloremque quibusdam at illo ullam.',
      authorId: 46540
    }
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
