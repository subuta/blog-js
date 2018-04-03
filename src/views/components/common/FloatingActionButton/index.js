import React from 'react'
import _ from 'lodash'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import withStyles from './style'

import MaterialButton from 'src/views/components/common/MaterialButton'

const enhance = compose(
  withStyles,
  withState('isHovered', 'setIsHovered', false)
)

export default enhance((props) => {
  const {
    styles,
    isHovered,
    setIsHovered,
    children,
    className,
    subActions
  } = props

  let fabWrapperClass = styles.FloatingActionButtonWrapper
  if (isHovered) {
    fabWrapperClass += ' is-hovered'
  }

  let fabClass = styles.FloatingActionButton
  if (className) {
    fabClass += ` ${className}`
  }

  return (
    <div
      className={fabWrapperClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {_.map(subActions, (action, i) => {
        return (
          <MaterialButton
            className={`${styles.FloatingActionButton} is-sub`}
            wavesClasses={['waves-float']}
            key={i}
          >
            {action}
          </MaterialButton>
        )
      })}

      <MaterialButton className={fabClass}>
        {children}
      </MaterialButton>
    </div>
  )
})
