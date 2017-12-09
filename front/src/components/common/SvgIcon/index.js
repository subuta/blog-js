import React from 'react'
import PropTypes from 'prop-types'

import classes from './style'

import { compose, setDisplayName, setPropTypes } from 'recompose'

const enhance = compose(
  setDisplayName('SvgIcon'),
  setPropTypes({
    name: PropTypes.string
  })
)

export default enhance((props) => {
  const {
    name,
    className,
    ...rest
  } = props

  let iconClass = `svg-icon ${classes.Icon}`
  if (className) {
    iconClass += ` ${className}`
  }

  return (
    <svg {...rest} className={iconClass}>
      <use xlinkHref={`/assets/symbol/svg/sprite.symbol.svg#${name}`} />
    </svg>
  )
})
