import Layout from 'src/views/components/layout/Layout'
import WikiSidebar from 'src/views/components/routes/Wiki/_Sidebar'
import Content from 'src/views/components/layout/Content'
import Router from 'next/router'
import _ from 'lodash'

import {
  compose,
  lifecycle
} from 'recompose'

import connect from './connect'

const enhance = compose(
  connect,
  lifecycle({
    componentWillMount () {
      const {articles} = this.props
      const article = _.first(articles)
      Router.replace(`/article?id=${article.id}`, `/w/${article.id}`)
    }
  })
)

export default enhance((props) => {
  return (
    <Layout>
      <WikiSidebar />

      <Content>
        wiki!
      </Content>
    </Layout>
  )
})
