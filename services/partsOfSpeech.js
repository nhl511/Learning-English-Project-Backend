const models = require('../models');

const partsOfSpeechService = {
    async getAllPartsOfSpeech({page, pageSize}) {
        return await models.partsOfSpeech.findAll({
            order: [['CREATED_AT', 'ASC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
        })
    },

    async getPartsOfSpeechActive() {
        return await models.partsOfSpeech.findAll({
            where: {
                ACTIVE: true
            },
            order: [['CREATED_AT', 'ASC']],
        })
    },

    async getPartsOfSpeechById(id) {
        return await models.partsOfSpeech.findByPk(id)
    },

    async createPartsOfSpeech(name) {
        return await models.partsOfSpeech.create({
            NAME: name
        })
    },

    async updatePartsOfSpeech({id, name}) {
        return await models.partsOfSpeech.update({
            NAME: name,
        },{
            where: {
                ID: id
            }
        })
    },

    async deletePartsOfSpeech(id) {
        return await models.partsOfSpeech.destroy({where: {ID: id}})
    },

    async updatePartOfSpeechStatus({id, active}) {
        return await models.partsOfSpeech.update({ACTIVE: active}, {where: {ID: id}})
    },

    async countPartsOfSpeech(){
        return await models.partsOfSpeech.count()
    },

    async countPartsOfSpeechActive(){
        return await models.partsOfSpeech.count({
            where: {
                ACTIVE: true
            }
        })
    }
}

module.exports = partsOfSpeechService