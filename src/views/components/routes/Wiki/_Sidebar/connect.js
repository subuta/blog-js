import _ from 'lodash'
import { connect } from 'react-redux'
import { getAll as getArticles } from 'src/views/modules/article'

const mapStateToProps = (state, oldProps) => {
  return {
    articles: getArticles(state)
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
