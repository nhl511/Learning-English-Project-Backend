const nodeMailer = require("nodemailer")
const mailConfig = require("../config/mail")

const createFormatResponse = ({status, code, success, message, data, accessToken, errors}) => {
    return {
        status,
        code,
        success,
        message,
        data,
        accessToken,
        errors,
    }
}

const sendMail = ({to, subject, htmlContent}) => {
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD
        }
    })

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to,
        subject,
        html: htmlContent
    }

    return transport.sendMail(options)
}

module.exports = {createFormatResponse, sendMail}