const Queue = require('bull')
const queueNames = require('./queueNames')
const config = require('./config')
const logger = require('../lib/logger/logger')
let queues = {}

const initialiseQueues = async() => {
  logger.info('initialising queues')
  const queuesCreationPromise = Object.keys(queueNames).map(async(queueNameKey) => {
    const queueName = queueNames[queueNameKey]
    logger.debug(`Creating queue instance for queue name: "${queueName}"`)
    const queueInstance = new Queue(queueName, config.url)
    queues[queueName] = queueInstance
    await queueInstance.isReady()
    logger.debug(`Queue "${queueName}" is ready to process the job`)
  })
await Promise.all(queuesCreationPromise);
}

initialiseQueues()
module.exports = queues
