const authService = require('../services/auth');
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");

const checkEmailExists = async (req, res, next) => {
    try{
        const email = await authService.checkEmailExists(req.body.email);
        if(email){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.CONFLICT, success: false, message: "Email already exists"})
            return res.status(code.CONFLICT).json(formattedResponse)
        }
        next()
    }catch(error){
        const formattedResponse = createFormatResponse({status: status.OK, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
        return res.status(code.SERVER_ERROR).json(formattedResponse)
    }
}

module.exports = checkEmailExists;