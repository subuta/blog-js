import connext from 'src/views/hoc/connext'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import ShowWikiRoute from 'src/views/components/routes/Wiki/Show'

import { requestArticles } from 'src/views/modules/article'
import { requestTags } from 'src/views/modules/tag'

const mapDispatchToProps = {
  requestArticles,
  requestTags
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const ShowWiki = (props) => <ShowWikiRoute {...props}/>

ShowWiki.getInitialProps = async function (ctx) {
  await Promise.all([
    ctx.dispatch(requestArticles()),
    ctx.dispatch(requestTags())
  ])
  return {}
}

export default enhance(ShowWiki)
