const Queue = require('bull')
const queueNames = require('./queueNames')
const config = require('./config')
let queues = {}

const initialiseQueues = async() => {
  console.log('initialising queues')
  const queuesCreationPromise = Object.keys(queueNames).map(async(queueNameKey) => {
    const queueName = queueNames[queueNameKey]
    console.log(`Creating queue instance for queue name: "${queueName}"`)
    const queueInstance = new Queue(queueName, config.url)
    console.log(config.url)
    queues[queueName] = queueInstance
    await queueInstance.isReady()
    console.log(`Queue "${queueName}" is ready to process the job`)
  })
await Promise.all(queuesCreationPromise);
}
initialiseQueues()
module.exports = queues
