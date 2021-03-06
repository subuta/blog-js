import Layout from 'src/views/components/layout/Layout'
import { withRouter } from 'next/router'
import _ from 'lodash'

import Head from 'next/head'

import {
  compose,
  lifecycle
} from 'recompose'

import Sidebar from 'src/views/components/routes/Chat/_Sidebar'
import Content from 'src/views/components/routes/Chat/_Content'

import withStyles from './style'
import connect from './connect'

import {
  staticFolder,
  baseUrl,
  fbAppId,
  twitterSite
} from 'src/views/constants/config'

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

export default enhance((props) => {
  const {
    channels,
    styles
  } = props

  let title = `Channels | sub-labo chat`

  return (
    <Layout {...props}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/c`} />
        <meta property="og:image" content={`${baseUrl}${staticFolder}/assets/images/ogp.png`} />
        <meta property="og:site_name" content="sub-labo.com" />
        <meta property="og:description" content={`sub-labo chat channels`} />
        <meta property="fb:app_id" content={fbAppId} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitterSite} />
      </Head>

      <Sidebar/>
      <Content/>
    </Layout>
  )
})
