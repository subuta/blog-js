exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 89832,
      title: 'capacitor Handmade Fresh Car withdrawal',
      summary: 'cultivate core PCI',
      slug: 'unde-ad-et',
      isPublished: true,
      content:
        'Rem commodi iusto inventore. Rerum voluptatem necessitatibus quo repellat rerum. Itaque minus voluptate. Quia error temporibus libero unde cupiditate distinctio ex quibusdam. Earum sit qui excepturi sit dolorem voluptatem. Odio laborum natus laborum omnis.'
    },
    {
      id: 50794,
      title: 'synthesizing parsing Norwegian Krone',
      summary: 'transmit Plastic Central',
      slug: 'cupiditate-quibusdam-beatae',
      isPublished: true,
      content:
        'Aut reprehenderit optio enim quo omnis voluptatem reprehenderit quis. Reiciendis aliquid facere. Id dolorem officia quis repellat aliquid. Cumque id dolores. Et accusamus inventore harum.'
    },
    {
      id: 90697,
      title: 'maroon programming Credit Card Account',
      summary: 'Rustic Keyboard',
      slug: 'et-ea-qui',
      isPublished: true,
      content:
        'Non porro tempora ab cum temporibus. Omnis consequuntur nihil. Dolorem at qui officia praesentium. Enim modi consequatur aut laudantium.'
    }
  ])
}
