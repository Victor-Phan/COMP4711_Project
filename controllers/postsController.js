const { post, postcomment } = require("../models");

exports.search = async (req, res, next) => {
  try {
    let { type, subject } = req.query
    let data;
    if (type) {
      data = await post.getPostByType(type)
    } else if (subject) {
      data = await post.getPostBySubject(subject)
    } else {
      throw new Error("Invalid search")
    }

    if (data.length == 0) {
      throw new Error(`No such type or subject: ${type || subject}`);
    }

    const result = data[0];

    result.map(async post => {
      const numberOfReplies = await postcomment.getNumberComments(post.id)
      const replies = await postcomment.getPostComments(post.id)
      return Object.assign({}, post, { numberOfReplies, replies })
    })

    res.render("searchResults", { posts: result, searchResultsCSS: true })
  } catch (err) {
    next(err)
  }
};
