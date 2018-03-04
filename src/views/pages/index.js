import { styled } from 'react-free-style'
import { compose } from 'recompose'
import { withRouter } from 'next/router'

const enhance = compose(
  withRouter
)

const Index = ({router}) => {
  router.replace('/channels', '/c')
  return null
}

export default enhance(Index)
