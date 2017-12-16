# blog-js
example my blogging project built-on top of `js-to-builder` and `matryoshka.js`

### How to develop

#### Start API server
docker-sync start
docker-compose up

or

npm i
env $(cat .env | xargs) npm run watch

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
