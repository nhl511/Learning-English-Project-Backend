const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const curriculumsService = require("../services/curriculums");
const curriculumsController = {
    async getAllCurriculums(req, res) {
        try{
            const curriculums = await curriculumsService.getAllCurriculums({
                page: Number(req.query.page),
                pageSize: Number(req.query.pageSize),
            });
            const count = await curriculumsService.countCurriculums();
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all curriculums successfully", data: {curriculums, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getCurriculumsActive(req, res) {
        try{
            const curriculums = await curriculumsService.getCurriculumsActive()
            const count = await curriculumsService.countCurriculumsActive();
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all curriculums successfully", data: {curriculums, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getCurriculumById(req, res) {
        try{
            const curriculum = await curriculumsService.getCurriculumById(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get curriculum successfully", data: {curriculum}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createCurriculum(req, res) {
        try{
            await curriculumsService.createCurriculum(req.body.name)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success:true, message: "Create curriculum successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateCurriculum(req, res) {
        try{
            await curriculumsService.updateCurriculum({id: req.params.id, name: req.body.name})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success:true, message: "Update curriculum successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deleteCurriculum(req, res) {
        try{
            await curriculumsService.deleteCurriculum(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success:true, message: "Delete curriculum successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateCurriculumStatus(req, res) {
        try{
            await curriculumsService.updateCurriculumStatus({id: req.params.id, active: req.body.active})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update curriculums status successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }
}

module.exports = curriculumsController