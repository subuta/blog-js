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

const mapStateToProps = (state, oldProps) => {
  const entities = getArticleEntities(state)
  const slug = _.get(oldProps, 'url.query.slug', '')
  return {
    article: denormalize(_.find(entities, {slug}), 'article', state),
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = {
  updateArticle,
  deleteArticle,
  addReaction,
  removeReaction
}

export default connect(mapStateToProps, mapDispatchToProps)
