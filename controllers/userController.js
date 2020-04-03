const {
  userModel,
  postModel,
  postcommentModel,
  profilelikeModel,
  messageModel
} = require("../models");

exports.getProfile = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const userData = await userModel.getUserProfileDetails(user_id);
    if (userData.length == 0) {
      throw new Error(`No such user with id: ${user_id}`);
    }

    const posts = await postModel.getAllPostsByUser(user_id);
    if (posts.length == 0) {
      throw new Error(`Posts not found by user: ${user_id}`);
    }

    const processedPosts = posts.map(async post => {
      const numOfRepliesData = await postcommentModel.getNumberComments(
        post.id
      );
      const numberOfReplies = numOfRepliesData[0].count;

      const replies = await postcommentModel.getPostComments(post.id);

      return Object.assign({}, post, { numberOfReplies, replies });
    });

    // This will need to change
    Promise.all(processedPosts)
      .then(completed =>
        res.render("profile", {
          user: userData[0],
          posts: completed,
          profileCSS: true,
          navbarCSS: true
        })
      )
      .catch(err => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};

exports.getUserMessages = async (req, res, next) => {
  //Not sure how to ensure only the user has access to their messages..
  try {
    const { id: user_id } = req.session.user;
    const user_ids = await userModel.getAllUserIdsWithExistingMessages(user_id);

    const processedConversations = user_ids.map(async user => {
      const e = { requestingUserID: user_id, requestedUserID: user.id };
      const conversation = await messageModel.getMessageForConversation(e);
      return conversation;
    });

    Promise.all(processedConversations)
      .then(completed => {
        const filteredConversation = completed.filter(
          conversation => conversation.length > 0
        );
        return res.render("conversations", {
          conversations: filteredConversation,
          messagingCSS: true
        });
      })
      .catch(err => {
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
