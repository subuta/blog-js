import Layout from 'src/views/components/layout/Layout'
import { withRouter } from 'next/router'
import _ from 'lodash'

import {
  compose,
  lifecycle
} from 'recompose'

import Sidebar from 'src/views/components/routes/Chat/_Sidebar'
import Content from 'src/views/components/routes/Chat/_Content'

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
      router.replace(`/channel?name=${channel.name}`, `/c/${channel.name}`)
    }
  })
)

export default enhance(({channels, styles}) => {
  return (
    <Layout>
      <Sidebar/>

      <Content/>
    </Layout>
  )
})
