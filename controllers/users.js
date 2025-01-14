const usersService = require("../services/users")
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");

const usersController = {
    async getAllUsers(req, res) {
        try{
            const users = await usersService.getAllUser(req.decoded.userId)
            const count = await usersService.countUsers()
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all users successfully", data: {users, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getUserById(req, res) {
        try{
            const user = await usersService.getUserById(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get user successfully", data: {user}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createUser(req, res) {
        try{
            await usersService.createUser({email: req.body.email, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create user successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateUser(req, res) {
        try{
            await usersService.updateUser({id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update user successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deleteUser(req, res) {
        try{
            await usersService.deleteUser(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Delete user successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateUserStatus(req, res) {
        try{
            await usersService.updateUserStatus({id: req.params.id, active: req.body.active})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update user status successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateUserAdmin(req, res) {
        try{
            await usersService.updateUserAdmin({id: req.params.id, admin: req.body.admin})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update user admin successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }
}

module.exports = usersController