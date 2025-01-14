const express = require('express');
const usersController = require("../controllers/users")
const router = express.Router();
const {request, modelTypes, userRole} = require("../constant/constant")
const checkIdExists = require("../middleware/checkIdExist")
const checkCredential = require("../middleware/checkCredentials")
const checkEmailVerifiedBeforeDelete = require("../middleware/checkEmailVerifiedBeforeDelete")

/* GET users listing. */
router.get("/", checkCredential(userRole.ADMIN), usersController.getAllUsers)

router.get("/:id", checkCredential(userRole.USER), checkIdExists({idFrom: request.PARAMS, model: modelTypes.USER}), usersController.getUserById)

router.post("/", checkCredential(userRole.ADMIN), usersController.createUser)

router.put("/update-status/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.USER}), usersController.updateUserStatus)

router.put("/update-admin/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.USER}), usersController.updateUserAdmin)

router.put("/:id", checkCredential(userRole.USER), checkIdExists({idFrom: request.PARAMS, model: modelTypes.USER}), usersController.updateUser)

router.delete("/:id",  checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.USER}), checkEmailVerifiedBeforeDelete, usersController.deleteUser)

module.exports = router;
