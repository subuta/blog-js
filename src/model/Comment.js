import { Model } from 'objection'

export const register = ({ Channel, User, Attachment }) => {
  Comment.relationMappings = {
    channel: {
      relation: Model.BelongsToOneRelation,
      modelClass: Channel,
      join: {
        from: 'comments.channelId',
        to: 'channels.id'
      }
    },

    commentedBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'comments.commentedById',
        to: 'users.id'
      }
    },

    attachment: {
      relation: Model.HasOneRelation,
      modelClass: Attachment,
      join: {
        from: 'comments.attachmentId',
        to: 'attachments.id'
      }
    },
  }
}

export default class Comment extends Model {
  static tableName = 'comments'
}
