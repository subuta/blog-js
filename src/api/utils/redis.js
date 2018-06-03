import redis from 'redis'
import { log } from 'src/api/utils/logger'
import _ from 'lodash'

let params = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB || 0,
  password: process.env.REDIS_PASSWORD,
}

if (process.env.REDIS_URL) {
  params = process.env.REDIS_URL
}

let channelListeners = {}

// Instantiate client.
const redisSubscribeClient = redis.createClient(params)
const redisClient = redis.createClient(params)

redisSubscribeClient.on('message', (channel, data) => {
  const listeners = channelListeners[channel]
  log(`Got message at ${channel}`)
  if (!listeners) return

  listeners.forEach(cb => cb(data))
})

export const subscribe = (channel, cb) => {
  if (!channelListeners[channel]) {
    redisSubscribeClient.subscribe(channel)
    channelListeners[channel] = []
  }

  channelListeners[channel].push(cb)

  log(`Subscribed to '${channel}', listeners = ${channelListeners[channel].length}`)
}

export const unsubscribe = (channel, cb) => {
  // Just ignore if no-listeners found.
  if (!channelListeners[channel]) return
  channelListeners[channel] = _.without(channelListeners[channel], cb)

  if (_.isEmpty(channelListeners[channel])) {
    redisSubscribeClient.unsubscribe(channel)
  }

  log(`UnSubscribed from '${channel}', listeners = ${channelListeners[channel].length}`)
}

// Serialize data as JSON String and publish it.
export const publish = (channel, data) => redisClient.publish(channel, JSON.stringify(data))
