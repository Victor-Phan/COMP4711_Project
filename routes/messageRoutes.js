const express = require("express");

const router = express.Router();

const { postsController } = require("../controllers");

router.post("/message", postsController.add);

module.exports = router;