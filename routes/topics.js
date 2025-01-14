const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topics');
const {request, modelTypes, userRole} = require("../constant/constant")
const checkIdExists = require('../middleware/checkIdExist');
const checkCredential = require('../middleware/checkCredentials')
const validateRequest = require("../middleware/validateRequest")
const topicSchema = require("../schema/topic")

/* GET users listing. */
router.get('/', topicsController.getAllTopics)

router.get('/:id', checkIdExists({idFrom: request.PARAMS, model: modelTypes.TOPIC}), topicsController.getTopicById)

router.post('/', checkCredential(userRole.ADMIN), validateRequest(topicSchema), topicsController.createTopic)

router.put('/update-status/:id', checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.TOPIC}), topicsController.updateTopicStatus)

router.put('/:id', checkCredential(userRole.ADMIN), validateRequest(topicSchema), checkIdExists({idFrom: request.PARAMS, model: modelTypes.TOPIC}), topicsController.updateTopic)

router.delete('/:id', checkCredential(userRole.ADMIN), checkIdExists({idFrom: request.PARAMS, model: modelTypes.TOPIC}), topicsController.deleteTopic)

module.exports = router;
