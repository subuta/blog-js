import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import {
  getAll as getComments,
  getIsProgress,
  createComment
} from 'src/modules/comments'

import {
  getAll as getChannels,
  requestChannel
} from 'src/modules/channels'

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state),
    comments: getComments(state)
  }
}

const mapDispatchToProps = {
  requestChannel,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)
