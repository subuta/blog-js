import Router from 'koa-router'
import comments from './comments'

const index = new Router()

index.use(comments.routes());

export default index
