import Navigation from './Navigation'
import Sidebar from './Sidebar'

import withStyles from './style'

const Layout = (props) => (
  <div className={props.styles.Container}>
    <Navigation/>
    <Sidebar sidebarClass="is-wiki"/>
    <div className={props.styles.Content}>
      {props.children}
    </div>
  </div>
)

export default withStyles(Layout)
