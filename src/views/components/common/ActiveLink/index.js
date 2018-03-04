import Link from 'next/link'
import { withRouter } from 'next/router'

import {
  compose,
} from 'recompose'

const enhance = compose(
  withRouter
)

export default enhance((props) => {
  let {
    router,
    children,
    className,
    isActive,
    ...rest
  } = props

  isActive = isActive || ((router) => router.pathname === rest.href)

  let linkClass = className || ''
  if (isActive(router)) {
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
