exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 10295,
      title: 'quantify Frozen payment',
      content:
        'Repudiandae similique veritatis qui autem doloribus voluptatem sapiente illo nulla. Nostrum facilis quia unde non est. Error sint voluptatem quia assumenda. Magnam velit et officia id quia et maiores voluptatem reiciendis.'
    },
    {
      id: 89794,
      title: 'Concrete Libyan Dinar',
      content:
        'A voluptatem sed vel recusandae voluptates ad nihil. Sint culpa dolorem sint nihil modi aut animi dignissimos enim. Et mollitia modi aspernatur qui dolorem. Dolor sapiente nihil molestiae reiciendis nisi sit quos explicabo.'
    },
    {
      id: 91264,
      title: 'Liberian Dollar',
      content:
        'Consequatur velit autem quia autem eos totam excepturi harum. Ad nihil sit ipsa. Voluptas nihil alias quidem explicabo.'
    }
  ])
}
