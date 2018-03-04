import _ from 'lodash'
import { connect } from 'react-redux'
import { getAll as getChannels } from 'src/views/modules/channel'

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state)
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
