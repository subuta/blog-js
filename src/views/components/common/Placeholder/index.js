import React from 'react'

import withStyles from './style'

export default withStyles(({styles, style = {}}) => (
  <div className={styles.Placeholder} style={style} />
))
