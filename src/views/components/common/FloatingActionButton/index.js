import React from 'react'
import _ from 'lodash'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import withStyles from './style'

const enhanceFAB = compose(
  withStyles,
  withHandlers(() => {
    let ref = null
    let _Waves = null

    const getWaves = async () => {
      if (!_Waves) {
        _Waves = await import('node-waves')
        _Waves.init({
          duration: 500,
          delay: 200
        })
      }
      return _Waves
    }

    return {
      setRef: (props) => async (_ref) => {
        ref = _ref

        let wavesClasses = props.wavesClasses || ['waves-float', 'waves-light']

        const Waves = await getWaves()
        Waves.attach(ref, wavesClasses)
      }
    }
  })
)

const FAB = enhanceFAB((props) => {
  const {
    styles,
    children,
    className,
    setRef
  } = props

  let fabClass = styles.FloatingActionButton
  if (className) {
    fabClass += ` ${className}`
  }

  return (
    <button
      className={fabClass}
      ref={setRef}
    >
      {children}
    </button>
  )
})

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

  return (
    <div
      className={fabWrapperClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {_.map(subActions, (action, i) => {
        return (
          <FAB
            className='is-sub'
            wavesClasses={['waves-float']}
            key={i}
          >
            {action}
          </FAB>
        )
      })}

      <FAB
        className={className}
      >
        {children}
      </FAB>
    </div>
  )
})
