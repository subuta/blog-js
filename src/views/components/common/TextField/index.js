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

  let textFieldClass = `${styles.TextField} input`
  if (className) {
    textFieldClass += ` ${textAreaClass}`
  }

  return (
    <div className={textFieldClass}>
      <label>
        {label && (
          <span>{label}:</span>
        )}

        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          spellCheck={false}
        />
      </label>
    </div>
  )
})
