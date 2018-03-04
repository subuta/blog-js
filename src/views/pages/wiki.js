import connext from 'src/views/hoc/connext'
import { requestArticle } from 'src/views/modules/article'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import WikiRoute from 'src/views/components/routes/Wiki'

const mapDispatchToProps = {
  requestArticle
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const Wiki = (props) => <WikiRoute {...props}/>

Wiki.getInitialProps = async function (ctx) {
  const {id} = ctx.query
  await ctx.dispatch(requestArticle(id))
  return {}
}

export default enhance(Wiki)
