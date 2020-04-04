const { posttypeModel, postModel, postcommentModel } = require("../models");

exports.getHomePage = async(req, res, next) => {
    const postTypes = await posttypeModel.getPostTypes();
    const posts = await postModel.getAllPostsDESC();

    //maybe get each post comment for each post here..
    //FE does not accomodate this yet.

    return res.render("home", {
        navbarCSS: true,
        homeCSS: true,
        passwordCheck: true,
        homePageJS: true,
        postTypes,
        posts
    });
}