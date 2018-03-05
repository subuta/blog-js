import Layout from 'src/views/components/layout/Layout'
import WikiSidebar from 'src/views/components/routes/Wiki/_Sidebar'
import { withRouter } from 'next/router'
import _ from 'lodash'

import {
  compose,
  lifecycle,
} from 'recompose'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect,
  withRouter,
  lifecycle({
    componentWillMount () {
      const {articles, router} = this.props
      const article = _.first(articles)
      router.replace(`/article?id=${article.id}`, `/w/${article.id}`)
    }
  })
)

export default enhance(({styles}) => {
  return (
    <Layout>
      <WikiSidebar />

      <div className={styles.WikiContent}>
        wiki!
      </div>
    </Layout>
  )
})
