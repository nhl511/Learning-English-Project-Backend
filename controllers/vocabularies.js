const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const vocabulariesService = require("../services/vocabularies")

const vocabulariesController = {
    async getAllVocabularies(req, res) {
        try{
            const vocabularies = await vocabulariesService.getAllVocabularies();
            const count = await vocabulariesService.countVocabularies();
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get all vocabularies successfully", data: {vocabularies, count}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async getVocabularyById(req, res) {
        try{
            const vocabulary = await vocabulariesService.getVocabularyById(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Get vocabulary successfully", data: {vocabulary}})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createVocabulary(req, res) {
        try{
            await vocabulariesService.createVocabulary({
                word: req.body.word,
                definition: req.body.definition,
                transcription: req.body.transcription,
                partsOfSpeechId: req.body.partsOfSpeechId,
                unitId: req.body.unitId,
                notes: req.body.notes,
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create vocabulary successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async createManyVocabulary(req, res) {
        try{
            await vocabulariesService.createManyVocabulary(req.body)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Create vocabularies successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateVocabulary(req, res) {
        try{
            await vocabulariesService.updateVocabulary({
                id: req.params.id,
                word: req.body.word,
                definition: req.body.definition,
                transcription: req.body.transcription,
                partsOfSpeechId: req.body.partsOfSpeechId,
                unitId: req.body.unitId,
                notes: req.body.notes,
            })
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update vocabulary successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async deleteVocabulary(req, res) {
        try{
            await vocabulariesService.deleteVocabulary(req.params.id)
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Delete vocabulary successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async updateVocabularyStatus(req, res) {
        try{
            await vocabulariesService.updateVocabularyStatus({id: req.params.id, active: req.body.active})
            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Update vocabulary status successfully"})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }
}

module.exports = vocabulariesController