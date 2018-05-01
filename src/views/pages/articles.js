import connext from 'src/views/hoc/connext'
import authorized from 'src/views/hoc/authorized'
import catchError from 'src/views/hoc/catchError'
import { compose } from 'recompose'
import AllWikiRoute from 'src/views/components/routes/Wiki/All'
import _ from 'lodash'

import {
  requestArticles,
  requestArticlesByTagId,
  requestIndexDraft
} from 'src/views/modules/article'

import {
  requestTags,
  requestTagByLabel
} from 'src/views/modules/tag'

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
  promises.push(ctx.dispatch(requestIndexDraft()))

  // find tag by label(tag param).
  const label = _.get(ctx, 'query.tag', '')
  if (label) {
    // if label passed then retrieve articles from tag.
    promises.push(ctx.dispatch(requestTagByLabel(label)))
  } else {
    // fetch all articles otherwise.
    promises.push(ctx.dispatch(requestArticles()))
  }

  await Promise.all(promises)

  return {}
}

export default enhance(AllWiki)
