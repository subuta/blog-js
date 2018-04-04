import connext from 'src/views/hoc/connext'
import { requestChannels } from 'src/views/modules/channel'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import catchError from 'src/views/hoc/catchError'
import ShowChannelRoute from 'src/views/components/routes/Chat/Show'

const mapDispatchToProps = {
  requestChannels
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  catchError,
  authorized
)

const ShowChannel = (props) => <ShowChannelRoute {...props}/>

ShowChannel.getInitialProps = async function (ctx) {
  await ctx.dispatch(requestChannels())
  return {}
}

export default enhance(ShowChannel)
