const { promisifyQuery } = require("./helperFunctions.js");

const baseSQL = `SELECT post.id, subject, type_id, message, user.first_name, user.last_name, user.image_url, IFNULL(replies, 0) AS replies, post.timestamp
FROM post 
LEFT JOIN (
SELECT id, first_name, last_name, image_url 
FROM user 
) user
ON post.user_id = user.id 
LEFT JOIN (
SELECT post_id, COUNT(*) AS replies
FROM postcomment
GROUP BY post_id
) postcomment
ON post.id = postcomment.post_id`;

function insertPost(e) {
  let { user_id, type, subject, message } = e;
  let sql = `INSERT INTO post (user_id, type_id, subject, message) 
               VALUES ("${user_id}", "${type}", "${subject}", "${message}")`;
  return promisifyQuery(sql);
}

function getOnePost(id) {
  let sql = `SELECT * FROM post WHERE id = '${id}'`;
  return promisifyQuery(sql);
}

function getAllPosts() {
  let sql = `SELECT * FROM post`;
  return promisifyQuery(sql);
}

function getAllPostsDESC() {
  let sql = `${baseSQL} ORDER BY post.timestamp DESC`;
  return promisifyQuery(sql);
}

function getAllPostsByUser(user_id) {
  let sql = `${baseSQL} WHERE user_id = '${user_id}'`;
  return promisifyQuery(sql);
}

function getPostsByType(type_id) {
  let sql = `${baseSQL} WHERE post.type_id = '${type_id}'`;
  return promisifyQuery(sql);
}

function getPostsByTypeDESC(type_id) {
  let sql = `${baseSQL} WHERE type_id = '${type_id}' ORDER BY post.timestamp DESC`;
  return promisifyQuery(sql);
}

function getPostsBySubject(filter) {
  let sql = `${baseSQL} WHERE subject LIKE '%${filter}%'`;
  return promisifyQuery(sql);
}

function getPostWithAllProperties(post_id) {
  let sql = `${baseSQL} WHERE post.id = ${post_id}`;
  return promisifyQuery(sql);
}

module.exports = {
  insertPost,
  getOnePost,
  getAllPosts,
  getAllPostsDESC,
  getAllPostsByUser,
  getPostsByType,
  getPostsByTypeDESC,
  getPostsBySubject,
  getPostWithAllProperties
};
