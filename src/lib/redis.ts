import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

export default redisClient

redisClient.on('error', function (err) {
  // TODO - error handling
  // eslint-disable-next-line no-console
  console.error('Could not connect to redis', err)
})

redisClient.on('connect', function () {
  // eslint-disable-next-line no-console
  console.log('Connected to Redis successfully')
})
