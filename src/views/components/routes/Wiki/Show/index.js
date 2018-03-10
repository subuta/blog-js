import Layout from 'src/views/components/layout/Layout'

import Sidebar from '../_Sidebar'
import Content from '../_Content'

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
      <Sidebar />

      <Content>
        <h1>{article.title}</h1>
      </Content>
    </Layout>
  )
})
