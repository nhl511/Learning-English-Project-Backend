const partsOfSpeechService = require("../services/partsOfSpeech")
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const req = require("express/lib/request");

const partsOfSpeechController = {
    async getAllPartsOfSpeech(req, res) {
        try{
            const partsOfSpeeches = await partsOfSpeechService.getAllPartsOfSpeech()
            const count = await partsOfSpeechService.countPartsOfSpeech()
            const formattedResponse = createFormatResponse({
                status: status.OK,
                code: code.SUCCESS,
                success: true,
                message: "Get all parts of speech successfully",
                data: {partsOfSpeeches, count}
            })
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getPartsOfSpeechActive(req, res) {
        try{
            const partsOfSpeeches = await partsOfSpeechService.getPartsOfSpeechActive()
            const count = await partsOfSpeechService.countPartsOfSpeechActive()
            const formattedResponse = createFormatResponse({
                status: status.OK,
                code: code.SUCCESS,
                success: true,
                message: "Get all parts of speech successfully",
                data: {partsOfSpeeches, count}
            })
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getPartsOfSpeechById(req, res) {
        try{
            const partsOfSpeech = await partsOfSpeechService.getPartsOfSpeechById(req.params.id)
            const formattedResponse = createFormatResponse({
                status: status.OK,
                code: code.SUCCESS,
                success: true,
                message: "Get parts of speech successfully",
                data: {partsOfSpeech}
            })
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createPartsOfSpeech(req, res){
        try{
            await partsOfSpeechService.createPartsOfSpeech(req.body.name)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create parts of speech successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updatePartsOfSpeech(req, res){
        try{
            await partsOfSpeechService.updatePartsOfSpeech({id: req.params.id, name: req.body.name})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update parts of speech successfully",})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch (error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deletePartsOfSpeech(req, res){
        try{
            await partsOfSpeechService.deletePartsOfSpeech(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Delete parts of speech successfully",})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updatePartsOfSpeechStatus(req, res){
        try{
            await partsOfSpeechService.updatePartOfSpeechStatus({id: req.params.id, active: req.body.active})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update parts of speech status successfully",})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }

}

module.exports = partsOfSpeechController