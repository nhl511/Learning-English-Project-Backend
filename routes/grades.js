const express = require('express');
const gradesController = require('../controllers/grades')
const checkIdExists = require("../middleware/checkIdExist")
const {modelTypes, request, userRole} = require("../constant/constant")
const router = express.Router();
const checkCredential = require("../middleware/checkCredentials")
const validateRequest = require("../middleware/validateRequest")
const gradeSchema= require("../schema/grade")
const checkUnique = require("../middleware/checkUnique")

/* GET users listing. */
router.get('/', checkCredential(userRole.ADMIN), gradesController.getAllGrades)

router.get('/active', checkIdExists({idFrom: request.QUERY, model: modelTypes.CURRICULUM}), gradesController.getGradesActive)

router.get('/:id', checkIdExists({idFrom: request.PARAMS, model: modelTypes.GRADE}), gradesController.getGradeById)

router.post('/', checkCredential(userRole.ADMIN), validateRequest(gradeSchema), checkIdExists({idFrom: request.BODY, model: modelTypes.CURRICULUM}), checkUnique(modelTypes.GRADE), gradesController.createGrade)

router.put('/update-status/:id', checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.GRADE}), gradesController.updateGradeStatus )

router.put('/:id', checkCredential(userRole.ADMIN), validateRequest(gradeSchema), checkIdExists({idFrom: request.PARAMS, model: modelTypes.GRADE}), checkIdExists({idFrom: request.BODY, model: modelTypes.CURRICULUM}), checkUnique(modelTypes.GRADE), gradesController.updateGrade)

router.delete('/:id', checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.GRADE}), gradesController.deleteGrade)

module.exports = router;
