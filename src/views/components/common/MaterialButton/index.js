import React from 'react'

import {
  compose,
  withHandlers
} from 'recompose'

import withStyles from './style'

const enhance = compose(
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

export default enhance((props) => {
  const {
    styles,
    children,
    className,
    setRef,
    ghost = false,
    wavesClasses,
    ...rest
  } = props

  let buttonClass = styles.MaterialButton
  if (className) {
    buttonClass += ` ${className}`
  }

  if (ghost) {
    buttonClass += ` is-ghost`
  }

  return (
    <button
      {...rest}
      className={buttonClass}
      ref={setRef}
    >
      {children}
    </button>
  )
})
