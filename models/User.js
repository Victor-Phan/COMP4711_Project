const { promisifyQuery } = require('./helperFunctions.js');

function insertUser(e) {
    let { first_name, last_name, email, password, image_url, about, country, dob } = e;
    let sql = `INSERT INTO user (first_name, last_name, email, password, image_url, about, country, dob) 
               VALUES (${first_name}, ${last_name}, ${email}, ${password}, ${image_url}, ${about}, ${country}, ${dob})`;
    return promisifyQuery(sql);
}

function updateUser(e) {
    //Cannot update password or email,
    let { id, first_name, last_name, image_url, about, country, dob } = e;
    let sql = `UPDATE user SET first_name = ${first_name}, 
                                last_name = ${last_name}, 
                                image_url = ${image_url}, 
                                about = ${about}, 
                                country = ${country}, 
                                dob = ${dob} 
                                WHERE (id = ${id})`;
    return promisifyQuery(sql);
}

function getUser(id) {
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    return promisifyQuery(sql);
}

function getUserDetails(id) {
    let sql = `SELECT id, first_name, last_name, image_url, about, country, dob FROM user WHERE id = ${id}`;
    return promisifyQuery(sql);
}

function getAllUsersDetail() {
    let sql = `SELECT id, first_name, last_name, image_url, about, country, dob FROM user`;
    return promisifyQuery(sql);
}

module.exports = {
    insertUser: insertUser,
    updateUser: updateUser,
    getUser: getUser,
    getUserDetails: getUserDetails,
    getAllUsersDetail: getAllUsersDetail
}