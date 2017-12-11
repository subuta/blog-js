import Router from 'koa-router'
import channels from './channels'
import comments from './comments'
import upload from './upload'

const api = new Router({prefix: '/api'})

api.use(channels.routes());
api.use(comments.routes());
api.use(upload.routes());

export default api
