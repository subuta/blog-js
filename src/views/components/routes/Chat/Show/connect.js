import _ from 'lodash'
import { connect } from 'react-redux'
import { getEntities as getChannelEntities } from 'src/views/modules/channel'

const mapStateToProps = (state, oldProps) => {
  const entities = getChannelEntities(state)
  const channelId = _.get(oldProps, 'url.query.id', '')
  return {
    channel: entities[channelId]
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
