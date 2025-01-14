const express = require('express');
const router = express.Router();
const vocabulariesController = require('../controllers/vocabularies');
const {request, modelTypes, userRole} = require("../constant/constant")
const checkIdExists = require("../middleware/checkIdExist");
const checkCredential = require("../middleware/checkCredentials")
const validateRequest = require("../middleware/validateRequest")
const vocabularySchema = require("../schema/vocabulary")

router.get("/", vocabulariesController.getAllVocabularies)

router.get("/:id", checkIdExists({idFrom: request.PARAMS, model: modelTypes.VOCABULARY}), vocabulariesController.getVocabularyById)

router.post("/", checkCredential(userRole.ADMIN), validateRequest(vocabularySchema), checkIdExists({idFrom: request.BODY, model: modelTypes.UNIT}), vocabulariesController.createVocabulary)

router.put("/update-status/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.VOCABULARY}), vocabulariesController.updateVocabularyStatus)

router.put("/:id", checkCredential(userRole.ADMIN), validateRequest(vocabularySchema), checkIdExists({idFrom: request.PARAMS, model: modelTypes.VOCABULARY}), checkIdExists({idFrom: request.BODY, model: modelTypes.UNIT}), vocabulariesController.updateVocabulary)

router.delete("/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.VOCABULARY}), vocabulariesController.deleteVocabulary)


module.exports = router;