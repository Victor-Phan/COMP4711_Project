const {promisifyQuery} = require('./helperFunctions.js');

function insertMessage(e) {
    let {sender_id, recipient_id, subject, message} = e;
    let sql = `INSERT INTO message (sender_id, recipient_id, subject, message) 
               VALUES ('${sender_id}', '${recipient_id}', '${subject}', '${message}')`;
    return promisifyQuery(sql);
}

function getAllMessagesForUser(id) {
    let sql = `SELECT * FROM message WHERE sender_id = '${id}' OR recipient_id = '${id}' ORDER BY timestamp ASC`;
    return promisifyQuery(sql);
}

function getMessageForConversation(requestingUserID, requestedUserID) {
    let sql = `SELECT * FROM message 
    WHERE (sender_id = '${requestingUserID}' OR recipient_id = '${requestingUserID}')
    AND (sender_id = '${requestedUserID}' OR recipient_id = '${requestedUserID}') ORDER BY timestamp ASC`;
    return promisifyQuery(sql);
}

module.exports = {
    insertMessage,
    getAllMessagesForUser,
    getMessageForConversation
}
