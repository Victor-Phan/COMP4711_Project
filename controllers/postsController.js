const { post, postcomment } = require("../models");

exports.add = async (req, res, next) => {
  try {
    const newPost = req.body
    newPost.user_id = req.session.user.id

    await post.insertPost(newPost)
    
    return res.send(newPost)
  } catch (err) {
    next(err)
  }
}

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

    const result = data;

    result.map(async post => {
      const numberOfReplies = await postcomment.getNumberComments(post.id)
      const replies = await postcomment.getPostComments(post.id)
      return Object.assign({}, post, { numberOfReplies, replies })
    })

    return res.render("searchResults", { posts: result, searchResultsCSS: true })
  } catch (err) {
    next(err)
  }
};
