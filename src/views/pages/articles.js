import connext from 'src/views/hoc/connext'
import { requestArticles } from 'src/views/modules/article'
import authorized from 'src/views/hoc/authorized'
import { compose } from 'recompose'
import AllWikiRoute from 'src/views/components/routes/Wiki/All'

const mapDispatchToProps = {
  requestArticles
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const AllWiki = (props) => <AllWikiRoute {...props}/>

AllWiki.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestArticles())
  return {}
}

export default enhance(AllWiki)
