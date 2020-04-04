const {promisifyQuery} = require('./helperFunctions.js');

function getAllMessageReplies(message_id) {
  const sql = `SELECT * FROM messageReply WHERE message_id = "${message_id}"`
  return promisifyQuery(sql);
}

function insertMessageReply(e) {
    const { user_id, message_id, reply } = e 
    const sql = `INSERT INTO messageReply (user_id, message_id, reply) 
               VALUES ("${user_id}", "${message_id}", "${reply}")`;
    return promisifyQuery(sql);
}

module.exports = {
  getAllMessageReplies,
  insertMessageReply
}