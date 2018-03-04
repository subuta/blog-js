import React from 'react'
import PropTypes from 'prop-types'

import getConfig from 'next/config'

const config = getConfig()
const {
  staticFolder
} = config.publicRuntimeConfig

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

  let iconClass = `svg-icon svg-${name}-dims ${styles.Icon}`
  if (className) {
    iconClass += ` ${className}`
  }

  return (
    <svg {...rest} className={iconClass}>
      <use xlinkHref={`${staticFolder}/assets/symbol/svg/sprite.symbol.svg#${name}`} />
    </svg>
  )
})
