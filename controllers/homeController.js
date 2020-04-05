const {
  posttypeModel,
  postModel,
  postcommentModel,
  userModel,
} = require('../models');

exports.getHomePage = async (req, res, next) => {
  try {
    const { id: user_id } = req.session.user;
    const postTypes = await posttypeModel.getPostTypes();
    const posts = await postModel.getAllPostsDESC();
    const [userDetails] = await userModel.getUserDetails(user_id);
    if (!userDetails) {
      throw new Error(`User not found: ${user_id}`);
    }

    //Get all comments within each post
    const processedPosts = posts.map(async (post) => {
      const postWithReplies = await postcommentModel.getPostComments(post.id);

      return {
        ...post,
        comments: postWithReplies,
      };
    });

    Promise.all(processedPosts)
      .then((posts) =>
        res.render('home', {
          userDetails,
          navbarCSS: true,
          homeCSS: true,
          passwordCheck: true,
          homePageJS: true,
          postTypes,
          posts,
        })
      )
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};
