import connext from 'src/views/hoc/connext'
import { requestChannels } from 'src/views/modules/channel'
import authorized from 'src/views/hoc/authorized'
import { compose } from 'recompose'
import AllChannelRoute from 'src/views/components/routes/Chat/All'

const mapDispatchToProps = {
  requestChannels
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized
)

const AllChannel = (props) => <AllChannelRoute {...props}/>

AllChannel.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestChannels())
  return {}
}

export default enhance(AllChannel)
