import { connect } from 'react-redux'

import {
  showMenu,
  hideMenu,
  getIsShowMenu
} from 'src/views/modules/ui'

import {
  requestMe,
  getCurrentUser,
} from 'src/views/modules/user'

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
    isShowMenu: getIsShowMenu(state)
  }
}

const mapDispatchToProps = {
  requestMe,
  showMenu,
  hideMenu
}

export default connect(mapStateToProps, mapDispatchToProps)
