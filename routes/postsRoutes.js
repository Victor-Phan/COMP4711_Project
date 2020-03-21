const express = require("express");

const router = express.Router();

const { postsController } = require("../controllers");

router.post("/posts", postsController.add);

module.exports = router;
