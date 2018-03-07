import _ from 'lodash'
import { connect } from 'react-redux'
import { getAll as getTags } from 'src/views/modules/tag'

const mapStateToProps = (state, oldProps) => {
  return {
    tags: getTags(state)
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)
