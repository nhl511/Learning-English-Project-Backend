const express = require('express');
const router = express.Router();
const partsOfSpeechController = require("../controllers/partsOfSpeech")
const checkIdExists = require("../middleware/checkIdExist")
const {request, modelTypes, userRole} = require("../constant/constant")
const checkCredential = require("../middleware/checkCredentials")
const validateRequest = require("../middleware/validateRequest")
const partsOfSpeechSchema = require("../schema/partsOfSpeech")

router.get("/", checkCredential(userRole.ADMIN), partsOfSpeechController.getAllPartsOfSpeech)

router.get("/active", partsOfSpeechController.getPartsOfSpeechActive)

router.get("/:id", checkIdExists({idFrom: request.PARAMS, model: modelTypes.PARTS_OF_SPEECH}), partsOfSpeechController.getPartsOfSpeechById)

router.post("/", checkCredential(userRole.ADMIN), validateRequest(partsOfSpeechSchema), partsOfSpeechController.createPartsOfSpeech)

router.put("/update-status/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.PARTS_OF_SPEECH}), partsOfSpeechController.updatePartsOfSpeechStatus)

router.put("/:id", checkCredential(userRole.ADMIN), validateRequest(partsOfSpeechSchema), checkIdExists({idFrom: request.PARAMS, model: modelTypes.PARTS_OF_SPEECH}), partsOfSpeechController.updatePartsOfSpeech)

router.delete("/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.PARTS_OF_SPEECH}), partsOfSpeechController.deletePartsOfSpeech)

module.exports = router;