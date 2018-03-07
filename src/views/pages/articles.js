import connext from 'src/views/hoc/connext'
import authorized from 'src/views/hoc/authorized'
import { compose } from 'recompose'
import AllWikiRoute from 'src/views/components/routes/Wiki/All'

import {
  requestArticles,
  requestArticlesByTagId
} from 'src/views/modules/article'
import { requestTags } from 'src/views/modules/tag'

const mapDispatchToProps = {
  requestArticlesByTagId,
  requestTags
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const AllWiki = (props) => <AllWikiRoute {...props}/>

AllWiki.getInitialProps = async function (ctx) {
  await Promise.all([
    // TODO: tagIdに渡された値でArticlesをフィルタしつつ、キレイに一覧表示する。
    ctx.dispatch(requestArticlesByTagId(10295)),
    ctx.dispatch(requestTags())])
  return {}
}

export default enhance(AllWiki)
