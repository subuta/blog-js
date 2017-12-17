export default async ({ Channel }) => {
  await Channel.create({name: 'hoge'})
  await Channel.create({name: 'fuga'})
  await Channel.create({name: 'piyo'})
}
