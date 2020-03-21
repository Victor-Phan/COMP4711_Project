const express = require("express");

const router = express.Router();

const { postsController } = require("../controllers");

router.get("/search", postsController.search);

module.exports = router;
