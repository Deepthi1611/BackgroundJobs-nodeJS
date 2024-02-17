const emailWorker =  require("./emailWorker");
const queueNames = require("./queueNames")
const queues = require("./queueManager")
const cron = require("node-cron");

function bootstrap() {
    Object.values(queueNames).map((queueName) => {
        const newQueue = queues[queueName]
        newQueue.on('completed', async(job, result) => {
            console.log(`${result} job completed successfully`)
        })
        newQueue.on('failed', async(job, error) => {
            console.log(`error, ${error}`)
        })
        newQueue.on('error', (error) => {
            console.log(`error to acquire queue connection to redis queue ${error}`)
        })
    })

    //adding workers to queue
    queues[queueNames.triggerEmail_queue].process(emailWorker)

    //add cron job
    cron.schedule('*/1 * * * *', () => {
        console.log(`cron job executed successfully at ${new Date().getMinutes()}`)
    })
}


bootstrap()

module.exports = {
    queues,
    queueNames
}