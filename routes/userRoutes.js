const express = require("express");

const router = express.Router();

const { userController } = require("../controllers");

router.get("/profile/:user_id", userController.getProfile);

router.get("/messages/:user_id", userController.getUserMessages);

module.exports = router;