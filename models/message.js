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

function getMessageForConversation(e) {
    let {requestingUserID, requestedUserID} = e;
    let sql = 
            `SELECT 
                recipient.id AS 'recipient_id',
                recipient.first_name AS 'recipient_first_name',
                recipient.last_name AS 'recipient_last_name',
                recipient.image_url AS 'recipient_image_url',
                sender.id AS 'sender_id',
                sender.first_name AS 'sender_first_name',
                sender.last_name AS 'sender_last_name',
                sender.image_url AS 'sender_image_url',
                message.subject AS 'subject', 
                message.message AS 'message', 
                message.timestamp AS 'timestamp'
            FROM message message
            INNER JOIN user recipient ON
                message.recipient_id = recipient.id
            INNER JOIN user sender ON
                message.sender_id = sender.id
            WHERE 
                (message.recipient_id = '${requestingUserID}' AND message.sender_id = '${requestedUserID}') OR
                (message.recipient_id = '${requestedUserID}' AND message.sender_id = '${requestingUserID}')
            ORDER BY message.timestamp ASC`;
    return promisifyQuery(sql);
}

module.exports = {
    insertMessage,
    getAllMessagesForUser,
    getMessageForConversation
}
