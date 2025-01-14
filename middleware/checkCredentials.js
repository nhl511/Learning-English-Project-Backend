const jwt = require('jsonwebtoken')
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const {userRole} = require("../constant/constant")

const checkCredential = (role) => {
    return async (req, res, next) => {
        if(!req.headers.authorization){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.UN_AUTHORIZED, success: false, message: "Authentication token is missing"})
            return res.status(code.UN_AUTHORIZED).json(formattedResponse)
        }
        const token = req.headers.authorization.split(' ')[1]
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            switch (role){
                case userRole.ADMIN:
                    if(!decoded.isAdmin){
                        const formattedResponse = createFormatResponse({status: status.ERROR, code: code.FORBIDDEN, success: false, message: "Not have permission"})
                        return res.status(code.FORBIDDEN).json(formattedResponse)
                    }
                    req.decoded = decoded;
                    next();
                    break;
                case userRole.USER:
                    if(decoded.userId !== req.params.id){
                        const formattedResponse = createFormatResponse({status: status.ERROR, code: code.FORBIDDEN, success: false, message: "Not have permission"})
                        return res.status(code.FORBIDDEN).json(formattedResponse)
                    }
                    next();
                    break;


            }
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.UN_AUTHORIZED, success: false, message: "Token is invalid"})
            return res.status(code.UN_AUTHORIZED).json(formattedResponse)
        }

    }
}

module.exports = checkCredential