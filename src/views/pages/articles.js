import connext from 'src/views/hoc/connext'
import authorized from 'src/views/hoc/authorized'
import catchError from 'src/views/hoc/catchError'
import { compose } from 'recompose'
import AllWikiRoute from 'src/views/components/routes/Wiki/All'
import _ from 'lodash'

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
  authorized,
  catchError
)

const AllWiki = (props) => <AllWikiRoute {...props}/>

AllWiki.getInitialProps = async function (ctx) {
  let promises = []

  promises.push(ctx.dispatch(requestTags()))
  promises.push(ctx.dispatch(requestArticles()))

  await Promise.all(promises)

  return {}
}

export default enhance(AllWiki)
