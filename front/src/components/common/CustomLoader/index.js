import React from 'react'

import withStyles from './style'

export default withStyles((props) => {
  const {
    isShow = false,
    label = false,
    size = 24,
    className,
    styles
  } = props;

  let loaderClass = styles.Loader;
  if (className) {
    loaderClass += ` ${className}`;
  }

  // isShow === false なら空divを返却
  if (!isShow) {
    return (
      <div/>
    )
  }

  // labelが有るならlabel付きで表示
  if (label) {
    return (
      <div className={styles.Container}>
        <div
          className={loaderClass}
          style={{
            height: size,
            width: size
          }}
        />
        <span className={styles.Label}>
          {label}
        </span>
      </div>
    )
  }

  // それ以外はloaderのみを表示
  return (
    <div
      className={loaderClass}
      style={{
        height: size,
        width: size
      }}
    />
  )
})
