import Router from 'koa-router'
import {
  getSignedUrl
} from 'src/utils/s3'

const upload = new Router({prefix: '/upload'})

// construct requestURL for s3 upload.
// SEE: https://devcenter.heroku.com/articles/s3-upload-node
upload.get('/sign-s3', async (ctx) => {
  const fileName = ctx.request.query['file-name'] || 'hoge.jpg';
  const fileType = ctx.request.query['file-type'] || 'image/jpeg';
  ctx.body = await getSignedUrl(fileName, fileType)
})

export default upload
