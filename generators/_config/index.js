import _ from 'lodash'
import Attachment from './model/Attachment'
import Article from './model/Article'
import ArticleTag from './model/ArticleTag'
import Tag from './model/Tag'
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
  article: {
    eager: '[tags]'
  },
  comment: {
    // pass custom route prefix.
    prefix: '/channels/:channelId/comments',

    except: [
      'update',
      'show'
    ],
    eager: '[channel, attachment, commentedBy]'
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
  tag: {
    only: [
      'index'
    ],
    eager: '[articles]'
  },
  user: {
    eager: '',
    only: []
  }
}

export const Models = {
  attachment: {
    schema: Attachment,
    seeds: 3
  },
  article: {
    schema: Article,
    seeds: 3
  },
  articleTag: {
    schema: ArticleTag,
    isJunction: true,
    seeds: 3
  },
  channel: {
    schema: Channel,
    seeds: 3
  },
  comment: {
    schema: Comment,
    seeds: 3
  },
  tag: {
    schema: Tag,
    seeds: 3
  },
  user: {
    schema: User,
    seeds: 3
  }
}
