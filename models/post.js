const { promisifyQuery } = require('./helperFunctions.js');

function insertPost(e) {
  let { user_id, type, subject, message } = e;
  let sql = `INSERT INTO post (user_id, type, subject, message) 
               VALUES ('${user_id}', '${type}', '${subject}', '${message}')`;
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

function getAllPostsByUser(user_id) {
  let sql = `SELECT * FROM post WHERE user_id = '${user_id}'`;
  return promisifyQuery(sql);
}

function getPostsByType(type) {
  let sql = `SELECT * FROM post WHERE type = '${type}'`;
  return promisifyQuery(sql);
}

function getPostsBySubject(filter) {
  let sql = `SELECT * FROM post WHERE subject LIKE '%${filter}%'`;
  return promisifyQuery(sql);
}

module.exports = {
  insertPost,
  getOnePost,
  getAllPosts,
  getAllPostsByUser,
  getPostsByType,
  getPostsBySubject
};
