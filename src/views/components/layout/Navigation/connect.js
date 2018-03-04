import { connect } from 'react-redux'

import {
  createChannel
} from 'src/views/modules/channel'

import {
  requestMe,
  getCurrentUser,
} from 'src/views/modules/user'

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = {
  requestMe
}

export default connect(mapStateToProps, mapDispatchToProps)
