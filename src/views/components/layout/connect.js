import { connect } from 'react-redux'

import {
  getIsShowMenu
} from 'src/views/modules/ui'

const mapStateToProps = (state) => {
  return {
    isShowMenu: getIsShowMenu(state)
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)
