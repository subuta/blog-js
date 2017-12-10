import { schema } from 'normalizr';

export const comment = new schema.Entity('comments');
export const commentList = new schema.Array(comment);
