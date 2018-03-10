exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles').insert([
    {
      id: 68554,
      title: 'China Salad eyeballs',
      summary: 'Avon Wooden Designer',
      content:
        'Inventore nostrum deserunt quae deleniti nulla aut est accusamus aspernatur. Inventore praesentium officiis occaecati necessitatibus occaecati nulla voluptatem minima ea. Consequuntur cum neque est.'
    },
    {
      id: 68018,
      title: 'Bulgarian Lev SQL calculate',
      summary: 'withdrawal',
      content:
        'Cumque quis soluta sint impedit aut. Velit totam consectetur quae cum aperiam. Aut reiciendis ut iure reprehenderit aut quod nam nisi.'
    },
    {
      id: 96438,
      title: 'interface invoice Investment Account',
      summary: 'Cotton',
      content:
        'Qui aut provident nihil ut eligendi consequatur autem. Voluptatum est non non eum sunt accusamus. Fuga voluptatem est perspiciatis quod in possimus vitae. Ipsa architecto repudiandae fugiat aut corrupti maxime.'
    }
  ])
}
