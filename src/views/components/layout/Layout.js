import Navigation from './Navigation'

import withStyles from './style'

const Layout = (props) => (
  <div className={props.styles.Container}>
    <Navigation/>
    {props.children}
  </div>
)

export default withStyles(Layout)
