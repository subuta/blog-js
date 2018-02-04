import React from 'react'
import { findDOMNode } from 'react-dom'

import _ from 'lodash'
import keycode from 'keycode'
import { Redirect } from 'react-router'

import withStyles from './style'
// import connect from './connect'

import CustomLoader from 'src/components/common/CustomLoader'
import Placeholder from 'src/components/common/Placeholder'
import Comment from 'src/components/common/Comment'

import {
  compose,
  branch,
  onlyUpdateForKeys,
  shouldUpdate,
  renderComponent,
  lifecycle,
  withState,
  withProps,
  withHandlers
} from 'recompose'

// const withLoading = branch(
//   ({channel, isChannelProgress}) => !channel && isChannelProgress,
//   renderComponent(({styles}) => {
//     return (
//       <div className={styles.Channels}>
//         <div className={styles.Header}>
//           <h4 className={styles.Title}>
//             <span className="list-icon">
//               <Placeholder style={{width: 16}} />
//             </span>
//             <span><Placeholder style={{opacity: 0.5, width: 100}} /></span>
//           </h4>
//
//           <div className={styles.Description}>
//             <Placeholder style={{opacity: 0.5, width: 200}} />
//           </div>
//         </div>
//
//         <div className={styles.CenteredContent}>
//           <CustomLoader
//             label='Channel is loading...'
//             size={48}
//             isShow
//           />
//         </div>
//       </div>
//     )
//   }),
//   _.identity
// )

const enhance = compose(
  withStyles
)

export default enhance((props) => {
  const {
    styles
  } = props

  return (
    <h1>hoge</h1>
  )
})
