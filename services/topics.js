const models = require("../models")

const topicsService = {
    async getAllTopics() {
        return await models.topic.findAll()
    },

    async getTopicById(id) {
        return await models.topic.findOne({where: {ID: id}})
    },

    async createTopic(title) {
        return await models.topic.create({
            TITLE: title
        })
    },

    async updateTopic({id, title}) {
        return await models.topic.update({
            TITLE: title,
        },{where: { ID: id }})
    },

    async deleteTopic(id) {
        return await models.topic.destroy({where: {ID: id}})
    },

    async countTopics() {
        return await models.topic.count()
    },

    async updateTopicStatus({id, active}){
        return await models.topic.update({
            ACTIVE: active
        },{
            where: {ID: id}
        })
    }
}

module.exports = topicsService