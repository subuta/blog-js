import Layout from 'src/views/components/layout/Layout'
import WikiSidebar from 'src/views/components/routes/Wiki/_Sidebar'

import {
  compose,
  lifecycle,
} from 'recompose'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect
)

export default enhance(({article, styles}) => {
  return (
    <Layout>
      <WikiSidebar />

      <div className={styles.WikiContent}>
        <h1>{article.title}</h1>
      </div>
    </Layout>
  )
})
