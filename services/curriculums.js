const models = require("../models")

const curriculumsService = {
    async getAllCurriculums({page, pageSize}) {
        return await models.curriculum.findAll({
            order: [['NAME', 'ASC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
        })
    },

    async getCurriculumsActive(){
        return await models.curriculum.findAll({
            where: {
                ACTIVE: true
            },
            order: [['NAME', 'ASC']],
        })
    },

    async getCurriculumById(id){
        return await models.curriculum.findOne({where: {ID: id}})
    },

    async createCurriculum(name) {
        return await models.curriculum.create({NAME: name})
    },

    async updateCurriculum({id, name}) {
        return await models.curriculum.update({
            NAME: name,
        },{where: {ID: id}})
    },

    async deleteCurriculum(id){
        return await models.curriculum.destroy({where: {ID: id}})
    },

    async countCurriculums(){
        return await models.curriculum.count()
    },

    async countCurriculumsActive(){
        return await models.curriculum.count({
            where: {
                ACTIVE: true
            }
        })
    },

    async updateCurriculumStatus({id, active}){
        return await models.curriculum.update({
            ACTIVE: active
        },{
            where: {ID: id}
        })
    }
}

module.exports = curriculumsService