import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

export default redisClient

redisClient.on('error', function (err) {
  // TODO - error handling
  console.error('Could not connect to redis', err)
})

redisClient.on('connect', function () {
  console.info('Connected to Redis successfully')
})
