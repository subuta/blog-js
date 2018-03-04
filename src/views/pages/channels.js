import Layout from 'src/views/components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import connext from 'src/views/hoc/connext'
import { getAll as getChannels, requestChannels } from 'src/views/modules/channel'
import authorized from 'src/views/hoc/authorized'
import { compose } from 'recompose'
import ChannelsRoute from 'src/views/components/routes/Channels'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  requestChannels
}

const enhance = compose(
  connext(mapStateToProps, mapDispatchToProps),
  authorized
)

const Channels =  () => {
  return (
    <ChannelsRoute />
  )
}

Channels.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestChannels())
  return {}
}

export default enhance(Channels)
