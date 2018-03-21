import { withRouter } from 'next/router'

import {
  compose,
  withHandlers
} from 'recompose'

import withStyles from './style'

const enhance = compose(
  withStyles,
  withRouter,
  withHandlers({
    onClick: ({router, href, as}) => (e) => {
      e.preventDefault()
      router.push(href, as)
    }
  })
)

export default enhance((props) => {
  let {
    router,
    children,
    className,
    isActive,
    onClick,
    href,
    as
  } = props

  isActive = isActive || ((router) => {
    return router.pathname === href ||
      router.asPath === as
  })

  let linkClass = 'link'
  if (className) {
    linkClass += ` ${className}`
  }

  if (isActive(router)) {
    linkClass += ' is-active'
  }

  return (
    <a
      href={as}
      onClick={onClick}
      className={linkClass}
    >
      {children}
    </a>
  )
})
