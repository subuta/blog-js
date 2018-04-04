import connext from 'src/views/hoc/connext'
import { requestChannels, requestChannelByName } from 'src/views/modules/channel'
import { compose } from 'recompose'
import _ from 'lodash'
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
  let promises = []

  promises.push(ctx.dispatch(requestChannels()))

  // find article by slug.
  const name = _.get(ctx, 'query.name', '')
  promises.push(ctx.dispatch(requestChannelByName(_.snakeCase(name))))

  await Promise.all(promises)

  return {}
}

export default enhance(ShowChannel)
