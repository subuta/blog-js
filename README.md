# blog-js
example my blogging project built-on top of `js-to-builder` and `matryoshka.js`

### How to develop

#### Run matryoshka.js(source code generator)

```
NODE_ENV=mat npx mat
```

#### Start API server
docker-sync start
docker-compose up

or

npm i
npm run watch

#### Migrate Database
##### Generate migration

```
npm run knex migrate:make name
```

##### Generate seed

```
npm run knex seed:make name
```

#### Start front-end
cd front
npm run watch

#### Open 
open http://localhost:3000 -> API
open http://localhost:4001 -> front-end

#### Reference
- [next.js with customized babel-preset](https://github.com/zeit/next.js/blob/canary/examples/with-configured-preset-env/.babelrc)
- [next.js with dotenv](https://gist.github.com/remy/6bb7beccc6355cafa7eac64f46467c66)

### For production

```
# API(koa)
npm run build
npm run serve

# Front-end(Caddy)
# SEE: https://caddyserver.com/download
curl https://getcaddy.com | bash -s personal
npm run serve
```
