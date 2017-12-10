import Router from 'koa-router'
import comments from './comments'
import upload from './upload'

const api = new Router({prefix: '/api'})

api.use(comments.routes());
api.use(upload.routes());

export default api
