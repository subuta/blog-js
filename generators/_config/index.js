import _ from 'lodash'
import Attachment from './model/Attachment'
import Article from './model/Article'
import ArticleTag from './model/ArticleTag'
import Tag from './model/Tag'
import Channel from './model/Channel'
import Comment from './model/Comment'
import Reaction from './model/Reaction'
import User from './model/User'

export const Routes = {
  channel: {
    except: [
      'update',
      'destroy'
    ],
    skipAuth: true,
    eager: '',
    joinRelation: ''
  },
  article: {
    skipAuth: [
      'index',
      'show'
    ],
    eager: '[tags, reactions.reactedBy, author]',
    joinRelation: '[tags]'
  },
  comment: {
    // pass custom route prefix.
    prefix: '/channels/:channelId/comments',

    skipAuth: [
      'index'
    ],

    except: [
      'show'
    ],

    eager: '[attachment, commentedBy, reactions.reactedBy]',
    joinRelation: ''
  },
  attachment: {
    imports: [
      ['uuid/v4', 'uuid'],
      ['path', 'path'],
      ['src/api/utils/s3', null, [
        'getSignedUrl'
      ]],
    ],
    only: [
      'create'
    ],
    eager: '',
    joinRelation: ''
  },
  tag: {
    only: [
      'index'
    ],
    skipAuth: true,
    eager: '[articles.[reactions.reactedBy, author]]',
    joinRelation: '[articles]'
  },
  reaction: {
    eager: '',
    only: [],
    joinRelation: ''
  },
  user: {
    eager: '',
    only: [],
    joinRelation: ''
  },
}

export const Models = {
  attachment: {
    schema: Attachment,
    seeds: 3
  },
  article: {
    schema: Article,
    seeds: 3,
    transformSeed: (seed) => {
      // isPublishedをtrueに固定する。
      seed['isPublished'] = true
      return seed
    }
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
  reaction: {
    schema: Reaction,
    hasDependency: true,
    seeds: 3
  },
  user: {
    schema: User,
    seeds: 3,
    transformSeed: (seed, i) => {
      // Mark first entry as admin.
      if (i === 1) {
        seed['isAdmin'] = true
      } else {
        seed['isAdmin'] = false
      }
      return seed
    }
  }
}
