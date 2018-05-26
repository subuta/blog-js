import _ from 'lodash'
import { connect } from 'react-redux'
import {denormalize} from 'src/views/utils/schema'

import {
  getEntities as getArticleEntities,
  updateArticle,
  deleteArticle,
  addReaction,
  removeReaction
} from 'src/views/modules/article'

import {
  getCurrentUser,
} from 'src/views/modules/user'

import {
  signAttachment,
  uploadAttachment
} from 'src/views/modules/attachment'

const mapStateToProps = (state, oldProps) => {
  const entities = getArticleEntities(state)
  const slug = _.get(oldProps, 'url.query.slug', '')
  const article = denormalize(_.find(entities, {slug}), 'article', state)
  return {
    article,
    articleId: article.id,
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = {
  updateArticle,
  deleteArticle,
  addReaction,
  signAttachment,
  uploadAttachment,
  removeReaction
}

export default connect(mapStateToProps, mapDispatchToProps)
