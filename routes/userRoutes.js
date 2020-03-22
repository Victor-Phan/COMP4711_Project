const express = require("express");

const router = express.Router();

const { userController } = require("../controllers");

router.get("/profile/:user_id", userController.getProfile);

module.exports = router;