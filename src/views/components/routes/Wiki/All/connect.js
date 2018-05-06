import _ from 'lodash'
import { connect } from 'react-redux'

import {
  createArticle,
  requestArticles,
  getIsRequestProgress,
} from 'src/views/modules/article'

import { getAll as getArticles } from 'src/views/modules/article'
import { getAll as getTags } from 'src/views/modules/tag'
import {denormalize} from 'src/views/utils/schema'

const mapStateToProps = (state, oldProps) => {
  let articles = getArticles(state)

  // filter articles by tag if specified.
  const tagParam = _.get(oldProps, 'url.query.tag')
  if (tagParam) {
    articles = _.filter(articles, (article) => {
      return !!_.find(article.tags, ['label', tagParam])
    })
  }

  return {
    articles,
    tagParam,
    isRequestProgress: getIsRequestProgress(state)
  }
}

const mapDispatchToProps = {
  createArticle,
  requestArticles
}

export default connect(mapStateToProps, mapDispatchToProps)
