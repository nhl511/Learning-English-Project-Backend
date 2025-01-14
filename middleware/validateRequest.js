const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const validateRequest = (schema) =>
    (req, res, next) => {
        try{
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next()
        }catch(err){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.BAD_REQUEST, success: false, message: "Validation Errors", errors: err.issues})
            return res.status(code.BAD_REQUEST).json(formattedResponse)
        }
    }


module.exports = validateRequest;