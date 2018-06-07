import redis from 'redis'
import { log, error } from 'src/api/utils/logger'
import _ from 'lodash'

const RETRY_BACKOFF = 1.7
const RETRY_ATTEMPT = 100

// SEE: https://github.com/NodeRedis/node_redis
const retryStrategy = (options) => {
  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands
    // with a individual error
    return redisSubscribeClient.emit('error', new Error('Retry time exhausted'))
  }

  if (options.attempt >= RETRY_ATTEMPT) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return redisSubscribeClient.emit('error', new Error('The server refused the connection'))
    }

    error(`[redisSubscribeClient] Cannot reconnect to redis while ${RETRY_ATTEMPT} times. TOTAL_RETRY_TIME = ${options.total_retry_time / 1000}s`)
    error(`[redisSubscribeClient] App will exit.`)

    // End reconnecting with built in error
    process.exit(1);

    return undefined;
  }

  // reconnect after
  return Math.max(options.total_retry_time * RETRY_BACKOFF, 1000)
}

let params = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB || 0,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: retryStrategy
}

if (process.env.REDIS_URL) {
  params = {
    url: process.env.REDIS_URL,
    retry_strategy: retryStrategy
  }
}

let channelListeners = {}

// Instantiate client.
const redisSubscribeClient = redis.createClient(params)
const redisClient = redis.createClient(params)

redisSubscribeClient.on('message', (channel, data) => {
  const listeners = channelListeners[channel]
  log(`[redisSubscribeClient] Got message at ${channel}`)
  if (!listeners) return

  listeners.forEach(cb => cb(data))
})

redisSubscribeClient.on('reconnecting', ({delay, attempt}) => {
  log(`[redisSubscribeClient] Try to reconnecting ${attempt} times, with delay = ${delay / 1000}s.`)
})

redisSubscribeClient.on('connect', () => {
  log('[redisSubscribeClient] Successfully connected to redis.')
})

redisSubscribeClient.on('ready', () => {
  log('[redisSubscribeClient] Connection with redis become ready state.')
})

redisSubscribeClient.on('end', () => {
  log('[redisSubscribeClient] Connection with redis ended successfully.')
})

redisSubscribeClient.on('error', (err) => {
  error(`[redisSubscribeClient] Got error with redis connection, err = ${err.message}.`)
  error(err)
  return true
})

export const subscribe = (channel, cb) => {
  if (!channelListeners[channel] || _.isEmpty(channelListeners[channel])) {
    redisSubscribeClient.subscribe(channel)
    channelListeners[channel] = []
  }

  channelListeners[channel].push(cb)

  log(`[redisSubscribeClient] Subscribed to '${channel}', listeners = ${channelListeners[channel].length}.`)
}

export const unsubscribe = (channel, cb) => {
  // Just ignore if no-listeners found.
  if (!channelListeners[channel]) return
  channelListeners[channel] = _.without(channelListeners[channel], cb)

  if (_.isEmpty(channelListeners[channel])) {
    redisSubscribeClient.unsubscribe(channel)
  }

  log(`[redisSubscribeClient] UnSubscribed from '${channel}', listeners = ${channelListeners[channel].length}.`)
}

// Serialize data as JSON String and publish it.
export const publish = (channel, data) => redisClient.publish(channel, JSON.stringify(data))
