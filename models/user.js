const { promisifyQuery } = require('./helperFunctions.js');

const baseSQL = `SELECT id, first_name, last_name, email, image_url, about, country, DATE_FORMAT(dob, "%Y-%m-%d") as dob FROM user`;

function insertUser(e) {
    let { first_name, last_name, email, password, image_url, about, country, dob } = e;
    let sql = `INSERT INTO user (first_name, last_name, email, password, image_url, about, country, dob) 
               VALUES ('${first_name}', '${last_name}', '${email}', '${password}', '${image_url}', '${about}', '${country}', '${dob}')`;
    return promisifyQuery(sql);
}

function updateUser(e) {
    //Cannot update password or email,
    let { id, first_name, last_name, image_url, about, country, dob } = e;
    let sql = `UPDATE user SET first_name = '${first_name}', 
                                last_name = '${last_name}', 
                                image_url = '${image_url}', 
                                about = '${about}', 
                                country = '${country}', 
                                dob = '${dob}' 
                                WHERE (id = '${id}')`;
    return promisifyQuery(sql);
}

function getUser(id) {
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    return promisifyQuery(sql);
}

function getUserDetails(id) {
    let sql = `${baseSQL} WHERE id = '${id}'`;
    return promisifyQuery(sql);
}

function getUserProfileDetails(id) {
    let sql = `SELECT id, first_name, last_name, email, image_url, about, country, DATE_FORMAT(dob, "%Y-%m-%d") as dob, profilelike.count as profileLikes
                FROM user 
                LEFT JOIN (
                    SELECT COUNT(*) AS count, user_profile_liked
                    FROM profilelike
                ) profilelike
                ON user.id = profilelike.user_profile_liked
                WHERE id = '${id}'`;
    return promisifyQuery(sql);
}

function getAllUsersDetail() {
    let sql = baseSQL;
    return promisifyQuery(sql);
}

function getUserByEmail(email) {
    let sql = `SELECT * FROM user where email = '${email}'`;
    return promisifyQuery(sql);
}

function getAllUserIdsWithExistingMessages(user_id) {
    let sql = 
            `SELECT DISTINCT user.id 
            FROM user user
            INNER JOIN message message ON
                user.id =  message.recipient_id OR
                user.id =  message.sender_id
            WHERE 
                message.recipient_id = '${user_id}' OR message.sender_id = '${user_id}'`;
    return promisifyQuery(sql);
}

module.exports = {
    insertUser,
    updateUser,
    getUser,
    getUserByEmail,
    getUserDetails,
    getUserProfileDetails,
    getAllUsersDetail,
    getAllUserIdsWithExistingMessages
}
