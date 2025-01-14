const {modelTypes, status, code} = require("../constant/constant")
const gradesService = require("../services/grades")
const unitsService = require("../services/units")
const {createFormatResponse} = require("../utils/libs");

const checkUnique = (model) => (req, res, next) => {
    switch(model){
        case modelTypes.GRADE:
            gradesService.findGradeByCurriculum({gradeNumber: req.body.gradeNumber, curriculumId: req.body.curriculumId})
                .then((found)=>{
                    if(found){
                        const formattedResponse = createFormatResponse({status: status.ERROR, code: code.CONFLICT, success: false, message: "Grade number already exists"})
                        return res.status(code.CONFLICT).json(formattedResponse)
                    }
                    next()

                })
            break;
        case modelTypes.UNIT:
            unitsService.findUnitByGradeId({unitNumber: req.body.unitNumber, gradeId: req.body.gradeId})
                .then((found)=>{
                    if(found){
                        const formattedResponse = createFormatResponse({status: status.ERROR, code: code.CONFLICT, success: false, message: "Unit number already exists"})
                        return res.status(code.CONFLICT).json(formattedResponse)
                    }
                    next()
                })

            break;
    }
}

module.exports = checkUnique;