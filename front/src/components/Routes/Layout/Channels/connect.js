import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import {
  getAll as getComments,
  getIsProgress,
  requestComments,
  createComment
} from 'src/modules/comments'

const mapStateToProps = (state) => {
  return {
    comments: getComments(state)
  }
}

const mapDispatchToProps = {
  requestComments,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)
