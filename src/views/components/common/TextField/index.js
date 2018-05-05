import React from 'react'
import _ from 'lodash'

import {
  compose
} from 'recompose'

import withStyles from './style'

const enhance = compose(
  withStyles
)

export default enhance((props) => {
  let {
    styles,
    onChange,
    className,
    label = '',
    value = '',
    placeholder = 'Put text here'
  } = props

  const error = _.get(props, 'error.message', null)

  let textFieldClass = `${styles.TextField} input`
  if (error) {
    textFieldClass += ' has-error'
  }

  if (className) {
    textFieldClass += ` ${className}`
  }

  return (
    <div className={textFieldClass}>
      <label>
        {label && (
          <span>{label}:</span>
        )}

        <div className="input">
          <input
            type="text"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            spellCheck={false}
          />

          {error && (
            <div className="error">{error}</div>
          )}
        </div>
      </label>
    </div>
  )
})
