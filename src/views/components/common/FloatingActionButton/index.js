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
      setRef: () => async (_ref) => {
        ref = _ref

        const Waves = await getWaves()
        Waves.attach(ref, ['waves-light'])
      }
    }
  })
)

export default enhance((props) => {
  const {
    styles,
    children,
    setRef
  } = props

  return (
    <button
      className={`${styles.FloatingActionButton} button-fab`}
      ref={setRef}
    >
      {children}
    </button>
  )
})
