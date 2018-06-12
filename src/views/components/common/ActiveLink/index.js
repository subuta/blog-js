import { withRouter } from 'next/router'

import {
  compose,
  withHandlers
} from 'recompose'

import _ from 'lodash'
import withStyles from './style'

const enhance = compose(
  withStyles,
  withRouter,
  withHandlers({
    onClick: ({onClick = _.noop, router, href, as}) => (e) => {
      e.preventDefault()

      // call original onClick if exists.
      onClick(e)

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
