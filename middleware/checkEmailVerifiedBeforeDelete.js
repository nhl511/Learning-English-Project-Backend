const authService = require("../services/auth")
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");

const checkEmailVerifiedBeforeDelete = async(req, res, next) => {
    const result = await authService.checkEmailVerified(req.params.id)
        if(result){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.FORBIDDEN, success: false, message: "Cannot delete user because user's email has verified"})
            return res.status(code.FORBIDDEN).json(formattedResponse)
        }
        next()
}

module.exports = checkEmailVerifiedBeforeDelete;