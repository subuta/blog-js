exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('comments').insert([
    {
      id: 2826,
      text:
        'Aut repellendus rerum. Ut dolores est libero provident. Explicabo repellendus dolor similique velit qui ut asperiores. Et nihil quis omnis iusto. Inventore impedit doloremque excepturi ut explicabo recusandae eos odio. Accusantium quae quibusdam aliquid adipisci consequatur et.',
      channelId: 82160,
      commentedById: 75900,
      attachmentId: '28d15c5a-a70c-48e4-9772-bc910f421907'
    },
    {
      id: 85551,
      text:
        'Ad numquam laborum nihil. Impedit sed dolor voluptas tempora dolorem odit voluptas nemo modi. Molestiae consectetur molestias et. Velit et facilis repellat nisi eum laboriosam. Libero ut aliquid est consequatur assumenda non. Voluptatum architecto reiciendis sint dolorum dolorum.',
      channelId: 93680,
      commentedById: 1796,
      attachmentId: 'abfbc020-04b2-4d70-a1ed-aa85e702e181'
    },
    {
      id: 13285,
      text:
        'Aliquid error recusandae deleniti sint corporis. Qui dolorem voluptatem eaque officiis asperiores amet nobis. Officiis rem quis nemo in est dolores nobis. Vel quod mollitia id occaecati eveniet veritatis earum delectus dicta. Architecto reprehenderit officia et sit enim assumenda nisi sint. Minima aliquam dolor iste.',
      channelId: 58071,
      commentedById: 25425,
      attachmentId: '62fc4caf-224d-4658-949e-b68307f974d2'
    }
  ])
}
