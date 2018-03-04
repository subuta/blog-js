import _ from 'lodash'
import { connect } from 'react-redux'
import { getEntities as getArticleEntities } from 'src/views/modules/article'

const mapStateToProps = (state, oldProps) => {
  const entities = getArticleEntities(state)
  const articleId = _.get(oldProps, 'url.query.id', '')
  return {
    article: entities[articleId]
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
