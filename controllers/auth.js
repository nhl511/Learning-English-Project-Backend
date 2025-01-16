const authService = require("../services/auth")
const {createFormatResponse} = require("../utils/libs");
const {status, code} = require("../constant/constant");
const bcrypt = require('bcrypt');
const {sendMail} = require("../utils/libs")
const path = require('path');
const jwt = require('jsonwebtoken');

const authController = {
    async register(req, res) {
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await authService.register({
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            })

            const token = jwt.sign({
                userId: newUser.ID
            }, process.env.JWT_SECRET, {expiresIn: '24h'})

            sendMail({
                to: req.body.email,
                subject: "Verify Email",
                htmlContent: `
                    <a href="${process.env.BACKEND_BASE_URL}/api/auth/verify?token=${token}">Verify</a>
            `})

            const formattedResponse = createFormatResponse({status: status.OK, code: code.CREATED, success: true, message: "Register account successfully"})
            return res.status(code.CREATED).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async verifyEmail(req, res) {
        try {
            await authService.updateEmailVerified(req.decoded.userId)
            return res.sendFile(path.join(__dirname, '../views/verified.html'));
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    },

    async login(req, res) {
        try{
            const user = await authService.checkEmailExists(req.body.email)

            if(!user){
                const formattedResponse = createFormatResponse({status: status.ERROR, code: code.UN_AUTHORIZED, success: false, message: "Wrong username or password"})
                return res.status(code.UN_AUTHORIZED).json(formattedResponse)
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.PASSWORD)

            if(!passwordMatch){
                const formattedResponse = createFormatResponse({status: status.ERROR, code: code.UN_AUTHORIZED, success: false, message: "Wrong username or password"})
                return res.status(code.UN_AUTHORIZED).json(formattedResponse)
            }

            if(!user.EMAIL_VERIFIED_AT){
                const formattedResponse = createFormatResponse({status: status.ERROR, code: code.FORBIDDEN, success: false, message: "This account not verified"})
                return res.status(code.FORBIDDEN).json(formattedResponse)
            }

            if(!user.ACTIVE){
                const formattedResponse = createFormatResponse({status: status.ERROR, code: code.BANNED, success: false, message: "This account has been banned"})
                return res.status(code.BANNED).json(formattedResponse)
            }

            const accessToken = jwt.sign({userId: user.ID, isAdmin: user.ADMIN}, process.env.JWT_SECRET, {expiresIn: '24h'})

            const formattedResponse = createFormatResponse({status: status.OK, code: code.SUCCESS, success: true, message: "Login successfully", accessToken})
            return res.status(code.SUCCESS).json(formattedResponse)
        }catch(error){
            const formattedResponse = createFormatResponse({status: status.ERROR, code: code.SERVER_ERROR, success: false, message: "Server Error", errors: error})
            return res.status(code.SERVER_ERROR).json(formattedResponse)
        }
    }
}

module.exports = authController