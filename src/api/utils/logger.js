import debug from 'debug'

export const log = (() => {
  // SEE: https://github.com/visionmedia/debug#output-streams
  let logger = debug('app:log')
  logger.log = console.log.bind(console)
  return logger
})()

export const error = debug('app:error')
