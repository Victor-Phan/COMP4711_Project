const { postModel } = require('../models');

exports.add = async (req, res, next) => {
  try {
    const newPost = req.body;

    newPost.user_id = req.session.user.id;

    const { insertId } = await postModel.insertPost(newPost);

    return res.redirect(`/posts/${insertId}`);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    let { type, subject } = req.query;
    let data;

    if (type) {
      data = await postModel.getPostsByType(type);
    } else if (subject) {
      data = await postModel.getPostsBySubject(subject);
    } else {
      throw new Error('Invalid search');
    }

    return res.render('searchResults', {
      posts: data,
      navbarCSS: true,
      ...(!!subject ? { term: subject } : {}),
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const data = await postModel.getAllPostsByUser(id);

    return res.render('postList', { posts: data, navbarCSS: true });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const [post] = await postModel.getPostWithAllProperties(post_id);

    if (!post) {
      throw new Error(`No such post with id: ${post_id}`);
    }

    return res.render('post', { post, navbarCSS: true });
  } catch (err) {
    next(err);
  }
};
