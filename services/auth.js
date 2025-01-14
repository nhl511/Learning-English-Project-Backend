const models = require('../models');
const {DataTypes, Sequelize} = require("sequelize");

const authService = {
    async register({email, password, firstName, lastName}) {
        return await models.user.create({
            EMAIL: email,
            PASSWORD: password,
            FIRST_NAME: firstName,
            LAST_NAME: lastName,
        })
    },

    async checkEmailExists(email){
        return await models.user.findOne({where:{EMAIL: email}})
    },

    async updateEmailVerified(id){
        return await models.user.update({
            EMAIL_VERIFIED_AT: Date.now()
        },{
            where: {ID: id}
        })
    },

    async checkEmailVerified(id){
        return await models.user.findOne({where:{ID: id, EMAIL_VERIFIED_AT: { [Sequelize.Op.ne]: null }}})
    },

}

module.exports = authService