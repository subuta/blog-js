import _ from 'lodash'
import Attachment from './model/Attachment'
import Channel from './model/Channel'
import Comment from './model/Comment'
import User from './model/User'

export const Routes = {
  channel: {
    except: [
      'update',
      'destroy'
    ],
    eager: '[comments.[attachment, commentedBy]]'
  },
  comment: {
    except: [
      'update',
      'show'
    ],
    eager: '[attachment, commentedBy]'
  },
  attachment: {
    imports: [
      ['uuid/v4', 'uuid'],
      ['path', 'path'],
      ['src/utils/s3', null, [
        'getSignedUrl'
      ]],
    ],
    only: [
      'create'
    ],
    eager: ''
  },
  user: {
    eager: '',
    only: []
  }
}

export const Models = {
  attachment: {
    schema: Attachment
  },
  channel: {
    schema: Channel
  },
  comment: {
    schema: Comment
  },
  user: {
    schema: User
  }
}
