import _ from 'lodash'
import { connect } from 'react-redux'

import {
  createArticle
} from 'src/views/modules/article'

import { getAll as getArticles } from 'src/views/modules/article'
import { getAll as getTags } from 'src/views/modules/tag'
import {denormalize} from 'src/views/utils/schema'

const mapStateToProps = (state, oldProps) => {
  let articles = getArticles(state)

  // filter articles by tag if specified.
  const tagParam = _.get(oldProps, 'url.query.tag')
  if (tagParam) {
    const tag = _.find(getTags(state), { label: tagParam })
    articles = _.map(tag.articles, (article) => {
      return denormalize(article, 'article', state)
    })
  }

  return {
    articles
  }
}

const mapDispatchToProps = {
  createArticle
}

export default connect(mapStateToProps, mapDispatchToProps)
