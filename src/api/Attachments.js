import Router from 'koa-router'
import uuid from 'uuid/v4'
import path from 'path'

import models, { Attachment } from 'src/model'

import _ from 'lodash'
import {
  getSignedUrl
} from 'src/utils/s3'

const attachments = new Router()

// construct requestURL for s3 upload.
// SEE: https://devcenter.heroku.com/articles/s3-upload-node
attachments.post('/', async (ctx) => {
  const { attachment } = ctx.request.body

  const name = attachment.name;
  const ext = path.extname(name)
  const type = attachment.type;

  // add uuid for prevent fileName conflict.
  const id = uuid()
  const tmpFileName = `${id}${ext}`

  const result = await getSignedUrl(tmpFileName, type)

  const record = await Attachment.create({
    id,
    name,
    type,
    url: result.url,
  })

  ctx.body = {
    result,
    attachment: record
  }
})

// export default channels
export default {
  routes: () => _.cloneDeep(attachments.routes()),
  register: (routers) => {}
}
