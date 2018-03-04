import { withRouter } from 'next/router'
import { compose } from 'recompose'

const enhance = compose(
  withRouter
)

const Index = ({router}) => {
  // redirect to /channels
  router.replace('/channels', '/c')
  return null
}

export default enhance(Index)
