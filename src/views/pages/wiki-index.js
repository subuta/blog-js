import connext from 'src/views/hoc/connext'
import { requestArticles } from 'src/views/modules/article'
import authorized from 'src/views/hoc/authorized'
import { compose } from 'recompose'
import WikiIndexRoute from 'src/views/components/routes/WikiIndex'

const mapDispatchToProps = {
  requestArticles
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const WikiIndex = (props) => <WikiIndexRoute {...props}/>

WikiIndex.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestArticles())
  return {}
}

export default enhance(WikiIndex)
