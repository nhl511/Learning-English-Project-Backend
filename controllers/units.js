const unitsService = require("../services/units")
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");

const unitsController = {
    async getAllUnits(req, res) {
        try{
            const units = await unitsService.getAllUnits({
                page: Number(req.query.page),
                pageSize: Number(req.query.pageSize),
            })
            const count = await unitsService.countUnits()
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all units successfully", data: {units, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getUnitsActive(req, res){
        try{
            let units;
            let count;
            if(req.query.gradeId){
                units = await unitsService.getUnitActiveByGradeId(req.query.gradeId)
                count = await unitsService.countUnitsActiveByGradeId(req.query.gradeId)
            }else{
                units = await unitsService.getUnitsActive();
                count = await unitsService.countUnitsActive()
            }
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all units successfully", data: {units, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getUnitById(req, res) {
        try{
            const unit = await unitsService.getUnitById(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get unit successfully", data: {unit}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createUnit(req, res) {
        try{
            await unitsService.createUnit({
                unitNumber: req.body.unitNumber,
                unitName: req.body.unitName,
                gradeId: req.body.gradeId,
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create unit successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateUnit(req, res) {
        try{
            await unitsService.updateUnit({
                unitNumber: req.body.unitNumber,
                unitName: req.body.unitName,
                gradeId: req.body.gradeId,
                id: req.params.id,
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update unit successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deleteUnit(req, res) {
        try{
            await unitsService.deleteUnit(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Delete unit successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateUnitStatus(req, res) {
        try{
            await unitsService.updateUnitStatus({
                id: req.params.id,
                active: req.body.active
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update unit status successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }
}

module.exports = unitsController