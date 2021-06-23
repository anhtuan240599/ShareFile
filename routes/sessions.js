const express = require("express");
const router = require("express-promise-router")();
const uploadMW = require("../middleware/upload");
const sessionController = require("../controllers/session.controller");
const configuration = require("../config/configurations");

router.param("session_id", sessionController.validateId);
router.route("/").post(sessionController.post);
router.route("/:session_id/confirmation").patch(sessionController.confirm);
router
  .route("/:session_id/files")
  .put(
    uploadMW(configuration.file.limits, configuration.file.deniedFile).array(
      "files",
      10
    ),
    sessionController.putSessionIdFile
  );
module.exports = router;
