import Layout from 'src/views/components/layout/Layout'
import WikiSidebar from 'src/views/components/routes/Wiki/_Sidebar'
import { withRouter } from 'next/router'
import _ from 'lodash'
import ActiveLink from 'src/views/components/common/ActiveLink'

import {
  compose,
  lifecycle,
} from 'recompose'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect,
  withRouter
)

export default enhance(({styles, articles}) => {
  return (
    <Layout>
      <WikiSidebar />

      <div className={styles.WikiContent}>
        <h4>Articles</h4>

        <ul className={styles.Articles}>
          {_.map(articles, ({id, title}) => {
            return (
              <li key={id}>
                <ActiveLink
                  href={`/article?id=${id}`}
                  as={`/w/${id}`}
                >
                  <span>{title}</span>
                </ActiveLink>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
})
