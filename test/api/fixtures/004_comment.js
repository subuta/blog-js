exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('comments').insert([
    {
      id: 57447,
      text:
        'Ut amet molestiae aliquam numquam ad ut et. Et ut perspiciatis fugiat expedita fuga hic odio. Ducimus cumque aut harum in perferendis veritatis tempora aut. Facilis officia sed. Eum excepturi officia ipsum sunt voluptatem eius. Rerum qui doloremque ex velit porro animi odio saepe sunt.',
      channelId: 68264,
      commentedById: 54551,
      attachmentId: '28d15c5a-a70c-48e4-9772-bc910f421907'
    },
    {
      id: 33984,
      text:
        'Id optio rem culpa minus. Nostrum aut et. Aliquam repellat est reprehenderit.',
      channelId: 36069,
      commentedById: 15599,
      attachmentId: 'abfbc020-04b2-4d70-a1ed-aa85e702e181'
    },
    {
      id: 46230,
      text:
        'Facilis cupiditate quo nemo hic. Rem nesciunt aliquid aut qui architecto saepe enim laborum. Quia dolor consequuntur et dolorem tenetur totam nisi asperiores.',
      channelId: 63669,
      commentedById: 34490,
      attachmentId: '62fc4caf-224d-4658-949e-b68307f974d2'
    }
  ])
}
