import _ from 'lodash'
import { connect } from 'react-redux'
import {
  getEntities as getArticleEntities,
  updateArticle
} from 'src/views/modules/article'

const mapStateToProps = (state, oldProps) => {
  const entities = getArticleEntities(state)
  const slug = _.get(oldProps, 'url.query.slug', '')
  return {
    article: _.find(entities, {slug})
  }
}

const mapDispatchToProps = {
  updateArticle
}

export default connect(mapStateToProps, mapDispatchToProps)
