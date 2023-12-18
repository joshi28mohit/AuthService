const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: 'Successfully Created the user',
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const destroy = async (req,res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(201).json({
            message: 'Successfully Deleted the user',
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = {
    create,
    destroy
}