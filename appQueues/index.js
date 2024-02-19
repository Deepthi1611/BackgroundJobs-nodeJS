const emailWorker =  require("./emailWorker");
const queueNames = require("./queueNames")
const queues = require("./queueManager")
const cron = require("node-cron");
const { where, Op } = require("sequelize");
const models = require("../models")

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

    //cron job to send email hourly for users added within that hour
    cron.schedule('0 * * * *', async() => {
        try {
            console.log(`cron job executed successfully at ${new Date().getMinutes()}`)
            let currentTime = new Date();
            let startTime = new Date();
            startTime.setHours(startTime.getHours() - 1);
            let recentUsers = await models.User.findAll({
                where: {
                    createdAt: { [Op.between]: [startTime, currentTime] }
                }
            });
            let users = recentUsers.map(user => {return `${user.firstName} ${user.lastName}`})
            let data = {}
            data.email = 'deepthipurijala@gmail.com'
            data.subject = 'List of recently added users'
            data.text = `Recently added users are ${users}`
            //add background job to send email
            queues[queueNames.triggerEmail_queue].add(data)
        } catch (error) {
            console.error('Error in cron job of email triggering:', error);
        }
        
    })
}


bootstrap()

module.exports = {
    queues,
    queueNames
}