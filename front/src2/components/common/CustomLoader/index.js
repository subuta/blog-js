import React from 'react'

import classes from './style'

export default (props) => {
  const {
    isShow = false,
    label = false,
    size = 24,
    className
  } = props;

  let loaderClass = classes.Loader;
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
      <div className={classes.Container}>
        <div
          className={loaderClass}
          style={{
            height: size,
            width: size
          }}
        />
        <span className={classes.Label}>
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
}
