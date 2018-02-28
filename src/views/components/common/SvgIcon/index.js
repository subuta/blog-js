import React from 'react'
import PropTypes from 'prop-types'

import withStyles from './style'

import { compose, setDisplayName, setPropTypes } from 'recompose'

const enhance = compose(
  withStyles,
  setDisplayName('SvgIcon'),
  setPropTypes({
    name: PropTypes.string
  })
)

export default enhance((props) => {
  const {
    name,
    className,
    styles,
    ...rest
  } = props

  let iconClass = `svg-icon ${styles.Icon}`
  if (className) {
    iconClass += ` ${className}`
  }

  return (
    <svg {...rest} className={iconClass}>
      <use xlinkHref={`/assets/symbol/svg/sprite.symbol.svg#${name}`} />
    </svg>
  )
})
