import {
  compose
} from 'recompose'

import withStyles from './style'

// FIXME: https://github.com/andreypopp/react-textarea-autosize/issues/48
// import Textarea from 'react-textarea-autosize'

const enhance = compose(
  withStyles
)

export default enhance((props) => {
  let {
    styles,
    onChange,
    label = '',
    value = '',
    maxLength,
    className,
    placeholder = 'Put text here'
  } = props

  let textAreaClass = `${styles.TextArea} input`
  if (maxLength && value.length >= maxLength) {
    textAreaClass += ' has-error'
  }

  if (className) {
    textAreaClass += ` ${textAreaClass}`
  }

  return (
    <div className={textAreaClass}>
      <label>
        {label && (
          <span>{label}:</span>
        )}

        <textarea
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          spellCheck={false}
        />
      </label>

      {maxLength && (
        <small>{value.length} / {maxLength}</small>
      )}
    </div>
  )
})
