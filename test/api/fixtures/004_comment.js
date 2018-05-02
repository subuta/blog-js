exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('comments').insert([
    {
      id: 14526,
      text:
        'Hic nesciunt beatae ab. Voluptatem laboriosam nostrum dolor. Ipsam vero qui saepe sit facilis a fuga ut.',
      channelId: 93290,
      commentedById: 61127,
      attachmentId: '28d15c5a-a70c-48e4-9772-bc910f421907'
    },
    {
      id: 82249,
      text:
        'Sed fugit cumque sit. Sed fuga sed ut aut. Alias quis ipsa animi in alias aspernatur corrupti. Vel laudantium amet debitis neque dolores nobis. Suscipit error odit quidem atque odit veniam voluptatibus qui. Sit officiis molestiae ducimus qui libero vel nostrum dolore explicabo.',
      channelId: 76939,
      commentedById: 41841,
      attachmentId: 'abfbc020-04b2-4d70-a1ed-aa85e702e181'
    },
    {
      id: 1452,
      text:
        'Officiis odio enim autem eum laudantium doloremque. Modi corrupti rerum aut sint illum placeat. Ipsum incidunt eaque sed repellendus quidem quisquam non sint.',
      channelId: 17648,
      commentedById: 46540,
      attachmentId: '62fc4caf-224d-4658-949e-b68307f974d2'
    }
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
