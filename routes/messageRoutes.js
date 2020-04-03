const express = require("express");

const router = express.Router();

const { messageController } = require("../controllers");

router.get("/sendmessage/:user_id", messageController.getSendMessagePage);

router.post("/sendmessage/:user_id", messageController.sendMessage);

router.post("/sendemail/:user_id", messageController.sendEmailMessage);

module.exports = router;