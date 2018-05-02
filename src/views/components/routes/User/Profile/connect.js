import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { normalize } from 'normalizr'
import { denormalize } from 'src/views/utils/schema'

import {
  requestUpdateUser,
  getCurrentUser
} from 'src/views/modules/user'

import {
  signAttachment,
  uploadAttachment
} from 'src/views/modules/attachment'

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = {
  requestUpdateUser,
  signAttachment,
  uploadAttachment
}

export default connect(mapStateToProps, mapDispatchToProps)
