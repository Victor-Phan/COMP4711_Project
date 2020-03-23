const express = require("express");

const router = express.Router();

const { messageController } = require("../controllers");

router.get("/sendmessage/:user_id", messageController.getSendMessagePage);

router.post("/sendmessage", messageController.sendMessage);

module.exports = router;