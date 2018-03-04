import connext from 'src/views/hoc/connext'
import { requestChannels } from 'src/views/modules/channel'
import authorized from 'src/views/hoc/authorized'
import { compose } from 'recompose'
import ChannelsRoute from 'src/views/components/routes/Channels'

const mapDispatchToProps = {
  requestChannels
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const Channels = (props) => <ChannelsRoute {...props}/>

Channels.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestChannels())
  return {}
}

export default enhance(Channels)
