import _ from 'lodash'
import Promise from 'bluebird'

// the promise resolved after `ms` elapsed.
export const wait = (ms = 300) => new Promise((resolve) => _.delay(resolve, ms))

// wrap promise with wait.
// wait at-least 300ms for better ux.
export const withWait = (promise, ms = 300) => new Promise((resolve, reject) => {
  Promise.all([promise, wait(ms)])
    .then(([data]) => resolve(data))
    .catch(reject)
})

export default wait
