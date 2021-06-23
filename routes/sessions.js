const express = require("express");
const router = require('express-promise-router')()
const upload = require('../middleware/upload')
const sessionController = require("../controllers/session.controller")
const configuration = require('../config/configurations')

router.param("session_id", sessionController.validateId)
router.route("/")
    .post(sessionController.post)


module.exports = router;