const { posttypeModel, postModel, postcommentModel, userModel } = require("../models");

exports.getHomePage = async(req, res, next) => {
    try {
        const { id: user_id } = req.session.user;
        const postTypes = await posttypeModel.getPostTypes();
        const posts = await postModel.getAllPostsDESC();
        const userDetails = await userModel.getUserDetails(user_id);
        if (userDetails.length == 0) {
            throw new Error(`User not found: ${user_id}`);
        }

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
                    posts: completed,
                    userDetails: userDetails[0]
                }))
            .catch(err => {
                throw err;
            });
    } catch (err) {
        next(err);
    }
}