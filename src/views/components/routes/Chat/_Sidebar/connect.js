import _ from 'lodash'
import { connect } from 'react-redux'
import { getAll as getChannels } from 'src/views/modules/channel'

import {
  getUnreadComments
} from 'src/views/modules/ui'

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state),
    unreadComments: getUnreadComments(state)
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
