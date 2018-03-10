import _ from 'lodash'
import { connect } from 'react-redux'

import { getAll as getArticles } from 'src/views/modules/article'
import { getAll as getTags } from 'src/views/modules/tag'

const mapStateToProps = (state, oldProps) => {
  let articles = getArticles(state)

  // filter articles by tag if specified.
  const tagId = _.get(oldProps, 'url.query.tag_id')
  if (tagId) {
    const tag = _.find(getTags(state), {id: Number(tagId)})
    articles = tag.articles
  }

  return {
    articles
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
