import { connect } from 'react-redux'

import {
  hideMenu
} from 'src/views/modules/ui'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  hideMenu
}

export default connect(mapStateToProps, mapDispatchToProps)
