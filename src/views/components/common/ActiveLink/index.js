import Link from 'next/link'
import { withRouter } from 'next/router'

import {
  compose,
} from 'recompose'

const enhance = compose(
  withRouter
)

export default enhance((props) => {
  const {
    router,
    children,
    className,
    ...rest
  } = props

  let linkClass = className || ''
  if (router.pathname === rest.href) {
    linkClass += ' is-active'
  }

  return (
    <Link {...rest}>
      <span className={linkClass}>
        {children}
      </span>
    </Link>
  )
})
