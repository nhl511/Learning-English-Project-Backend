const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const authService = require("../services/auth");
const jwt = require("jsonwebtoken");
const path = require("path");

const checkEmailVerified = (req, res, next) => {
        const token = req.query.token;

        if (!token) {
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.BAD_REQUEST, success: false, message: "Token is required"})
            return res.status(code.BAD_REQUEST).json(formattedResponse)
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                const formattedResponse = createFormatResponse({status: status.ERROR, code: code.BAD_REQUEST, success: false, message: "Token is not valid"})
                return res.status(code.BAD_REQUEST).json(formattedResponse)
            }
            try{
                authService.checkEmailVerified(decoded.userId).then((verifiedUser)=>{
                    if(verifiedUser){
                        return res.sendFile(path.join(__dirname, '../views/NotVerified.html'));
                    }
                    req.decoded = decoded;
                    if (decoded.userId) {
                        next();
                    }
                });
            }catch(error){
                const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
                return res.status(code.SERVER_ERROR).json(formattedResponse)
            }
        });
}

module.exports = checkEmailVerified;