exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('comments').insert([
    {
      id: 28160,
      text:
        'Maiores quae neque. Cupiditate aperiam rerum aspernatur. Atque ut molestias ut repellat illo molestiae voluptas sed. Facere rerum dolores provident earum fuga modi. Consectetur voluptatem aut voluptas quo omnis nostrum.',
      channelId: 31156,
      commentedById: 92666,
      attachmentId: 'Practical Frozen Bacon deposit open architecture'
    },
    {
      id: 79089,
      text:
        'Dolorum labore aspernatur. Commodi totam expedita sapiente quaerat alias ipsa cumque. Eaque adipisci dolorem cupiditate adipisci accusamus eum voluptates optio. Et ut accusantium doloribus amet modi omnis in. Deleniti in ut.',
      channelId: 99821,
      commentedById: 58010,
      attachmentId: 'calculating Orchestrator deposit'
    },
    {
      id: 87194,
      text:
        'Fugit nesciunt exercitationem. Quisquam quia quod harum. Amet est omnis magnam labore eos sequi et sit nulla. Dolor quam rerum quod molestias.',
      channelId: 54787,
      commentedById: 37436,
      attachmentId: 'Handmade driver'
    }
  ])
}
