const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const checkEmailExists = require("../middleware/checkEmailExists")
const checkEmailVerified = require("../middleware/checkEmailVerified");
const validateRequest = require("../middleware/validateRequest")
const authSchema = require("../schema/auth")


router.get("/verify", checkEmailVerified, authController.verifyEmail)

router.post("/register", validateRequest(authSchema), checkEmailExists,  authController.register)

router.post("/login", validateRequest(authSchema), authController.login)

router.post("/logout", authController.logout)

module.exports = router;