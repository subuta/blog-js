import Layout from 'src/views/components/layout/Layout'
import ChannelSidebar from 'src/views/components/routes/Chat/_Sidebar'
import { withRouter } from 'next/router'
import _ from 'lodash'

import {
  compose,
  lifecycle
} from 'recompose'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect,
  withRouter,
  lifecycle({
    // FIXME: renderの中でRouter.replaceを呼ぶと無限ループになる
    componentWillMount () {
      const {router, channels} = this.props
      const channel = _.first(channels)
      router.replace(`/channel?id=${channel.id}`, `/c/${channel.id}`)
    }
  })
)

export default enhance(({channels, styles}) => {
  return (
    <Layout>
      <ChannelSidebar/>

      <div className={styles.ChatContent}/>
    </Layout>
  )
})
