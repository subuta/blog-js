import Header from '../Header'

import withStyles from './style'

const Layout = (props) => (
  <div>
    {props.children}
  </div>
)

export default withStyles(Layout)
