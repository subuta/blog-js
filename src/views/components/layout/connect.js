import { connect } from 'react-redux'

import {
  showMenu,
  hideMenu,
  getIsShowMenu
} from 'src/views/modules/ui'

const mapStateToProps = (state) => {
  return {
    isShowMenu: getIsShowMenu(state)
  }
}

const mapDispatchToProps = {
  showMenu,
  hideMenu
}

export default connect(mapStateToProps, mapDispatchToProps)
