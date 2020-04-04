const { posttypeModel, postModel, postcommentModel } = require("../models");

exports.getHomePage = async(req, res, next) => {
    const postTypes = await posttypeModel.getPostTypes();
    const posts = await postModel.getAllPostsDESC();

    //Get all comments within each post
    const processedPosts = posts.map(async post => {
        const postWithReplies = await postcommentModel.getPostComments(post.id);

        return Object.assign({}, post, { comments: postWithReplies });
    });

    Promise.all(processedPosts)
        .then(completed =>
            res.render("home", {
                navbarCSS: true,
                homeCSS: true,
                passwordCheck: true,
                homePageJS: true,
                postTypes,
                posts: completed
            }))
        .catch(err => {
            throw err;
        });
}