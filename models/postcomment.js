const {promisifyQuery} = require('./helperFunctions.js');

function insertPostComment(e) {
    let {post_id, user_id, comment} = e;
    let sql = `INSERT INTO postcomment (post_id, user_id, comment) 
               VALUES (${post_id}, ${user_id}, ${comment})`;
    return promisifyQuery(sql);
}
function getPostComments(post_id) {
    let sql = `SELECT * FROM postcomment WHERE post_id = ${post_id} ORDER BY timestamp ASC`;
    return promisifyQuery(sql);
}

function getNumberComments(post_id) {
    let sql = `SELECT COUNT(id) AS count FROM postcomment WHERE post_id = ${post_id}`;
    return promisifyQuery(sql);
}

module.exports = {
    insertPostComment: insertPostComment,
    getPostComments: getPostComments,
    getNumberComments: getNumberComments
}