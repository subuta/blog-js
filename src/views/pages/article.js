import connext from 'src/views/hoc/connext'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import catchError from 'src/views/hoc/catchError'
import ShowWikiRoute from 'src/views/components/routes/Wiki/Show'
import _ from 'lodash'

import { requestArticleBySlug } from 'src/views/modules/article'
import { requestTags } from 'src/views/modules/tag'

const mapDispatchToProps = {
  requestArticleBySlug,
  requestTags
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized,
  catchError
)

const ShowWiki = (props) => <ShowWikiRoute {...props}/>

ShowWiki.getInitialProps = async function (ctx) {
  let promises = []

  promises.push(ctx.dispatch(requestTags()))

  // find article by slug.
  const slug = _.get(ctx, 'query.slug', '')
  promises.push(ctx.dispatch(requestArticleBySlug(slug)))

  await Promise.all(promises)

  return {}
}

export default enhance(ShowWiki)
