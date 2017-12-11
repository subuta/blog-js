import { schema } from 'normalizr';

export const comment = new schema.Entity('comments');
export const commentList = new schema.Array(comment);

export const channel = new schema.Entity('channels');
export const channelList = new schema.Array(channel);

channel.define({
  comments: [comment]
})

comment.define({
  channel
})
