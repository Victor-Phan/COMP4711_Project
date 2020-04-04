const {
  userModel,
  postModel,
  postcommentModel,
  profilelikeModel
} = require("../models");

exports.getProfile = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const userData = await userModel.getUserDetails(user_id);
    if (userData.length == 0) {
      throw new Error(`No such user with id: ${user_id}`);
    }

    const posts = await postModel.getAllPostsByUser(user_id);

    const data = await profilelikeModel.hasUserLiked(
      req.session.user.id,
      user_id
    );

    const hasLiked = !!data[0].count;

    const processedPosts = posts.map(async (post) => {
      const numOfRepliesData = await postcommentModel.getNumberComments(
        post.id
      );
      const numberOfReplies = numOfRepliesData[0].count;

      const replies = await postcommentModel.getPostComments(post.id);

      return Object.assign({}, post, { numberOfReplies, replies });
    });

    // This will need to change
    Promise.all(processedPosts)
      .then((completed) =>
        res.render("profile", {
          user: userData[0],
          posts: completed,
          hasLiked,
          profileCSS: true,
          navbarCSS: true,
        })
      )
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};

exports.getEditPage = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const userData = await userModel.getUserDetails(user_id);
    if (userData.length == 0) {
      throw new Error(`No such user with id: ${user_id}`);
    }

    return res.render("editProfile", { user: userData[0], navbarCSS: true });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.session.user;

    await userModel.updateUser({ id, ...req.body });

    return res.redirect("/profile");
  } catch (err) {
    next(err);
  }
};
