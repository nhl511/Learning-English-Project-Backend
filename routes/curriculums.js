const express = require('express');
const router = express.Router();
const curriculumsController = require('../controllers/curriculums');
const checkIdExists = require("../middleware/checkIdExist")
const {request, modelTypes, userRole} = require("../constant/constant")
const checkCredential = require("../middleware/checkCredentials")
const validateRequest = require("../middleware/validateRequest")
const curriculumSchema= require('../schema/curriculum')

/* GET users listing. */
router.get('/', checkCredential(userRole.ADMIN), curriculumsController.getAllCurriculums)

router.get("/active", curriculumsController.getCurriculumsActive)

router.get('/:id', checkIdExists({idFrom: request.PARAMS, model: modelTypes.CURRICULUM}), curriculumsController.getCurriculumById)

router.post('/', checkCredential(userRole.ADMIN), validateRequest(curriculumSchema), curriculumsController.createCurriculum)

router.put('/update-status/:id', checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.CURRICULUM}), curriculumsController.updateCurriculumStatus)

router.put('/:id', checkCredential(userRole.ADMIN), validateRequest(curriculumSchema), checkIdExists({idFrom: request.PARAMS, model: modelTypes.CURRICULUM}), curriculumsController.updateCurriculum)

router.delete('/:id', checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.CURRICULUM}), curriculumsController.deleteCurriculum)


module.exports = router;
