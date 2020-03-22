const { user, post, postcomment, profilelike } = require("../models");

exports.getProfile = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const userData = await user.getUserDetails(user_id);
    if (userData.length == 0) {
      throw new Error(`No such user with id: ${user_id}`);
    }

    const profileLikes = await profilelike.countLikes(user_id);

    userData[0].profileLikes = profileLikes[0].count;

    const posts = await post.getAllPostsByUser(user_id);
    if(posts.length == 0) {
      throw new Error(`Posts not found by user: ${user_id}`);
    }

    const processedPosts = posts.map(async post => {
      const numOfRepliesData = await postcomment.getNumberComments(post.id);
      const numberOfReplies = numOfRepliesData[0].count;

      const replies = await postcomment.getPostComments(post.id);

      return Object.assign({}, post, { numberOfReplies, replies });
    });

    Promise.all(processedPosts)
      .then(completed =>
        res.render("profile", {
          user: userData,
          posts: completed,
          profileCSS: true
        })
      )
      .catch(err => {
        throw err;
      });
    

  } catch (err) {
    next(err);
  }
};
