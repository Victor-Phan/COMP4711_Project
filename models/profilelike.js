const {promisifyQuery} = require('./helperFunctions.js');

function insertLike(e) {
    let {user_profile_liked, user_liked_profile} = e;
    let sql = `INSERT INTO profilelike (user_profile_liked, user_liked_profile) 
               VALUES (${user_profile_liked}, ${user_liked_profile})`;
    return promisifyQuery(sql);
}

function removeLike(e) {
    let {user_profile_liked, user_liked_profile} = e;
    let sql = `DELETE FROM profilelike WHERE user_profile_liked = ${user_profile_liked} AND user_liked_profile = ${user_liked_profile}`;
    return promisifyQuery(sql);
}

function countLikes(userID) {
    let sql = `SELECT COUNT(*) AS count FROM profilelike WHERE user_profile_liked = ${userID}`;
    return promisifyQuery(sql);
}
module.exports = {
    insertLike: insertLike,
    removeLike: removeLike,
    countLikes: countLikes
}