const models = require('../models');
const {Op} = require("sequelize");

const usersService = {
    async getAllUser(currentUserId){
        return await models.user.findAll({
            where: {
                ID: {
                    [Op.ne]: currentUserId,
                },
            },
            order: [['CREATED_AT', 'DESC']],
        })
    },

    async getUserById(id){
        return await models.user.findByPk(id)
    },

    async createUser({email, password, firstName, lastName}){
        return await models.user.create({
            EMAIL: email,
            PASSWORD: password,
            FIRST_NAME: firstName,
            LAST_NAME: lastName
        })
    },

    async updateUser({id, firstName, lastName}) {
        return await models.user.update({
            FIRST_NAME: firstName,
            LAST_NAME: lastName,
        }, {
            where: {ID: id}
        })
    },

    async deleteUser(id){
        return await models.user.destroy({where: {ID: id}})
    },

    async countUsers(){
        return await models.user.count()
    },

    async updateUserStatus({id, active}){
        return await models.user.update({ACTIVE: active}, {where: {ID: id}})
    },

    async updateUserAdmin({id, admin}){
        return await models.user.update({ADMIN: admin}, {where: {ID: id}})
    },

};

module.exports = usersService;