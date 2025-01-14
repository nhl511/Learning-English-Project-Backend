const models = require('../models');
const {modelTypes, status, code, request} = require("../constant/constant")
const {createFormatResponse} = require("../utils/libs");

const checkIdExists = ({idFrom, model}) => {
    return async (req, res, next) => {
        let myModel
        switch(model){
            case modelTypes.TOPIC: myModel = models.topic; break;
            case modelTypes.CURRICULUM: myModel = models.curriculum; break;
            case modelTypes.GRADE: myModel = models.grade; break;
            case modelTypes.UNIT: myModel = models.unit; break;
            case modelTypes.PARTS_OF_SPEECH: myModel = models.partsOfSpeech; break;
            case modelTypes.VOCABULARY: myModel = models.vocabulary; break;
            case modelTypes.USER: myModel = models.user; break;
        }
        let id;
        switch(idFrom){
            case request.PARAMS: id = req.params.id; break;
            case request.BODY: id = req.body[`${model}Id`]; break;
            case request.QUERY:
                if(!req.query[`${model}Id`]) return next();
                id = req.query[`${model}Id`]; break;
        }
        const item = await myModel.findByPk(id);
        if(!item) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.NOT_FOUND, success: false, message: `${model} ID not found`})
            return res.status(code.NOT_FOUND).json(formattedResponse)
        }
        next()
    }
}

module.exports = checkIdExists