import Layout from 'src/views/components/layout/Layout'
import { withRouter } from 'next/router'
import _ from 'lodash'
import ActiveLink from 'src/views/components/common/ActiveLink'

import {
  compose,
  lifecycle,
} from 'recompose'

import withStyles from './style'
import connect from './connect'

import Sidebar from '../_Sidebar'
import Content from '../_Content'

const enhance = compose(
  withStyles,
  connect,
  withRouter
)

export default enhance(({styles, articles}) => {
  return (
    <Layout>
      <Sidebar />

      <Content>
        <h4>Articles</h4>

        <ul>
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
      </Content>
    </Layout>
  )
})
