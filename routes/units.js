const express = require('express');
const router = express.Router();
const unitsController = require('../controllers/units');
const {request, modelTypes, userRole} = require("../constant/constant")
const checkIdExists = require("../middleware/checkIdExist")
const checkCredential = require("../middleware/checkCredentials")
const validateRequest = require("../middleware/validateRequest")
const unitSchema = require("../schema/unit")
const checkUnique = require("../middleware/checkUnique")

router.get("/", checkCredential(userRole.ADMIN), unitsController.getAllUnits)

router.get('/active', checkIdExists({idFrom: request.QUERY, model: modelTypes.GRADE}), unitsController.getUnitsActive)

router.get("/:id", checkIdExists({idFrom: request.PARAMS, model: modelTypes.UNIT}), unitsController.getUnitById)

router.post("/", checkCredential(userRole.ADMIN), validateRequest(unitSchema), checkIdExists({idFrom: request.BODY, model: modelTypes.GRADE}), checkUnique(modelTypes.UNIT), unitsController.createUnit)

router.put("/update-status/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.UNIT}), unitsController.updateUnitStatus)

router.put("/:id", checkCredential(userRole.ADMIN), validateRequest(unitSchema), checkIdExists({idFrom: request.PARAMS, model: modelTypes.UNIT}), checkIdExists({idFrom: request.BODY, model: modelTypes.GRADE}), unitsController.updateUnit)

router.delete("/:id", checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.UNIT}), unitsController.deleteUnit)

module.exports = router;
