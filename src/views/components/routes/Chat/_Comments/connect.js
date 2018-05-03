import _ from 'lodash'
import { connect } from 'react-redux'

import {
  addReaction,
  removeReaction,
} from 'src/views/modules/comment'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  addReaction,
  removeReaction,
}

export default connect(mapStateToProps, mapDispatchToProps)
