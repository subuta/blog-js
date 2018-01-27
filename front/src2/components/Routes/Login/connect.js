import { connect } from 'react-redux'
import { injectReducer } from 'src/modules'
import store from 'src/store'
import { push } from 'react-router-redux'
import _ from 'lodash'

import {
  getAll as getUsers,
  requestUpdateUser
} from 'src/modules/users'

const mapStateToProps = (state) => {
  return {
    users: getUsers(state)
  }
}

const mapDispatchToProps = {
  requestUpdateUser
}

export default connect(mapStateToProps, mapDispatchToProps)
