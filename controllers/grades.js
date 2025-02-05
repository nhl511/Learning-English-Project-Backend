const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const gradeService = require("../services/grades");

const gradesController = {
    async getAllGrades(req, res) {
        try{
            const grades = await gradeService.getAllGrades({
                page: Number(req.query.page),
                pageSize: Number(req.query.pageSize),
            });
            const count = await gradeService.countGrades()
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all grades successfully", data: {grades, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getGradesActive(req, res){
        try{
            let grades;
            let count;
            if(req.query.curriculumId){
                 grades = await gradeService.getGradeActiveByCurriculumId(req.query.curriculumId)
                 count = await gradeService.countGradesActiveByCurriculumId(req.query.curriculumId)
            }else{
                 grades = await gradeService.getGradesActive();
                 count = await gradeService.countGradesActive()
            }
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all grades successfully", data: {grades, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getGradeById(req, res) {
        try{
            const grade = await gradeService.getGradeById(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get grade successfully", data: {grade}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createGrade(req, res) {
        try{
            await gradeService.createGrade({
                gradeNumber: req.body.gradeNumber,
                curriculumId: req.body.curriculumId
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create grade successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch (error) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateGrade(req, res) {
        try{
            await gradeService.updateGrade({id: req.params.id, gradeNumber: req.body.gradeNumber, curriculumId: req.body.curriculumId})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update grade successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deleteGrade(req, res) {
        try{
            await gradeService.deleteGrade(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Delete grade successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateGradeStatus(req, res) {
        try{
            await gradeService.updateGradeStatus({id: req.params.id, active: req.body.active})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update grade status successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }

}

module.exports = gradesController