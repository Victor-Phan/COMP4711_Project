const express = require("express");

const router = express.Router();

const { posttypeModel } = require("../models")

router.get("/", async (req, res, next) => {
  const postTypes = await posttypeModel.getPostTypes();
  return res.render("home", { navbarCSS: true, postTypes })
});

module.exports = router;