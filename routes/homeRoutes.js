const express = require("express");

const router = express.Router();

const { posttypeModel, postModel, postcommentModel } = require("../models");

router.get("/", async (req, res, next) => {
  const postTypes = await posttypeModel.getPostTypes();
  const posts = await postModel.getAllPostsDESC();
  return res.render("home", { navbarCSS: true, postTypes, posts });
});

module.exports = router;
