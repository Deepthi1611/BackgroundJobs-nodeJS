const { sequelize } = require("../../models")
const {queues, queueNames} = require("../../appQueues/index")
const models = require('../../models')

const createUser = async(data) => {
    console.log('Registration is in progress, you will receive an email once your registration is successful')
    await models.User.create(data)
    data.subject = 'User Registration successful'
    data.text = `Hello ${data.firstName} ${data.lastName},
    Your registration is completed successfully`
    //add background job
    queues[queueNames.triggerEmail_queue].add(data)
}

module.exports = createUser