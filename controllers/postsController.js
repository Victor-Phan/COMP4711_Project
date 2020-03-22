const { post, postcomment } = require("../models");

exports.add = async (req, res, next) => {
  try {
    const newPost = req.body;
    newPost.user_id = req.session.user.id;

    await post.insertPost(newPost);

    return res.send(newPost);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    let { type, subject } = req.query;
    let data;
    
    if (type) {
      data = await post.getPostsByType(type);
    } else if (subject) {
      data = await post.getPostsBySubject(subject);
    } else {
      throw new Error("Invalid search");
    }

    const result = data;

    const processedPosts = result.map(async post => {
      const numOfRepliesData = await postcomment.getNumberComments(post.id);
      const numberOfReplies = numOfRepliesData[0].count;

      const replies = await postcomment.getPostComments(post.id);

      return Object.assign({}, post, { numberOfReplies, replies });
    });

    Promise.all(processedPosts)
      .then(completed =>
        res.render("searchResults", {
          posts: completed,
          searchResultsCSS: true
        })
      )
      .catch(err => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const data = await post.getOnePost(post_id);

    if (data.length == 0) {
      throw new Error(`No such post with id: ${post_id}`);
    }

    const result = data[0];

    return res.render("post", { post: result });
  } catch (err) {
    next(err);
  }
};
