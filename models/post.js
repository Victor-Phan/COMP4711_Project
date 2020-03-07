const {promisifyQuery} = require('./helperFunctions.js');

function insertPost(e) {
    let {user_id, type, subject, message} = e;
    let sql = `INSERT INTO post (user_id, type, subject, message) 
               VALUES (${user_id}, ${type}, ${subject}, ${message})`;
    return promisifyQuery(sql);
}

function getAllPost() {
    let sql = `SELECT * FROM post`;
    return promisifyQuery(sql);
}

function getPostByType(type) {
    let sql = `SELECT * FROM post WHERE type = ${type}`;
    return promisifyQuery(sql);
}

function getPostBySubject(filter) {
    let sql = `SELECT * FROM post WHERE subject LIKE '%${filter}%'`;
    return promisifyQuery(sql);
}

module.exports = {
    insertPost: insertPost,
    getAllPost: getAllPost,
    getPostByType: getPostByType,
    getPostBySubject: getPostBySubject
}