const createUser = require('../../controllers/createUserControllers/createUserController')

const createUserHandler = async(req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    await createUser(data)
    res.status(201).send({success: true, message: 'User created successfully'})
}

module.exports = createUserHandler