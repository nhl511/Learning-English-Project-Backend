const topicsService = require('../services/topics');
const {createFormatResponse, Response} = require("../utils/libs");
const {status, code} = require('../constant/constant')

const topicsController = {
    async getAllTopics(req, res) {
        try{
            const topics = await topicsService.getAllTopics()
            const count = await topicsService.countTopics()
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all topics successfully", data: {topics, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getTopicById(req, res) {
        try{
            const topic = await topicsService.getTopicById(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get topic successfully", data: {topic}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createTopic(req, res) {
        try {
            await topicsService.createTopic(req.body.title)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create topic successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateTopic(req, res) {
        try{
            await topicsService.updateTopic({
                id: req.params.id,
                title: req.body.title,
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update topic successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deleteTopic(req, res) {
        try{
            await topicsService.deleteTopic(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Delete topic successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateTopicStatus(req, res) {
        try{
            await topicsService.updateTopicStatus({id: req.params.id, active: req.body.active})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update topic status successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }

}

module.exports = topicsController