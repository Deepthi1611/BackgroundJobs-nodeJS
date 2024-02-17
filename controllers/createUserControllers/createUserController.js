const { sequelize, User } = require("../../models")
const {queues, queueNames} = require("../../appQueues/index")

const createUser = async(data) => {
    await User.create(data)
    //add background job
    queues[queueNames.triggerEmail_queue].add(data)
}

module.exports = createUser