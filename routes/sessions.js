const express = require("express");
const router = require('express-promise-router')()
const upload = require('../middleware/upload')
const sessionController = require("../controllers/session.controller")
const configuration = require('../config/configurations')

router.route("/")
    .post(sessionController.validateId)


module.exports = router;