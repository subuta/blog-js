import connext from 'src/views/hoc/connext'
import { requestArticles } from 'src/views/modules/article'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import ShowWikiRoute from 'src/views/components/routes/Wiki/Show'

const mapDispatchToProps = {
  requestArticles
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const ShowWiki = (props) => <ShowWikiRoute {...props}/>

ShowWiki.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestArticles())
  return {}
}

export default enhance(ShowWiki)
