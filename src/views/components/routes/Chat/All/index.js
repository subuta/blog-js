import Layout from 'src/views/components/layout/Layout'
import ChannelSidebar from 'src/views/components/routes/Chat/_Sidebar'
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
    // FIXME: renderの中でRouter.replaceを呼ぶと無限ループになる
    componentWillMount () {
      const {channels} = this.props
      const channel = _.first(channels)
      Router.replace(`/channel?id=${channel.id}`, `/c/${channel.id}`)
    }
  })
)

export default enhance(({channels}) => {
  return (
    <Layout>
      <ChannelSidebar />

      <Content>
      </Content>
    </Layout>
  )
})
