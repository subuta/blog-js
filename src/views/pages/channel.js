import connext from 'src/views/hoc/connext'
import { requestChannel } from 'src/views/modules/channel'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import ChannelRoute from 'src/views/components/routes/Channel'

const mapDispatchToProps = {
  requestChannel
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const Channel = (props) => <ChannelRoute {...props}/>

Channel.getInitialProps = async function (ctx) {
  const {id} = ctx.query
  await ctx.dispatch(requestChannel(id))
  return {}
}

export default enhance(Channel)
