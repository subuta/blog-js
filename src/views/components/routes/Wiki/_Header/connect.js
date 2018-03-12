import _ from 'lodash'
import { connect } from 'react-redux'

import {
  showMenu
} from 'src/views/modules/ui'

const mapStateToProps = (state, oldProps) => {
  return {
  }
}

const mapDispatchToProps = {
  showMenu
}

export default connect(mapStateToProps, mapDispatchToProps)
