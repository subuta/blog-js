import Layout from 'src/views/components/layout/Layout'
import ChannelSidebar from 'src/views/components/routes/Chat/_Sidebar'
import Content from 'src/views/components/layout/Content'
import { withRouter } from 'next/router'
import _ from 'lodash'

import {
  compose
} from 'recompose'

import connect from './connect'

const enhance = compose(
  withRouter,
  connect
)

export default enhance(({router, channels}) => {
  return (
    <Layout>
      <ChannelSidebar />

      <Content>
      </Content>
    </Layout>
  )
})
