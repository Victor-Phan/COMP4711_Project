const { promisifyQuery } = require("./helperFunctions.js");

function getAllMessageReplies(message_id) {
  const sql = `SELECT messageReply.*, first_name, last_name, image_url, DATE_FORMAT(messageReply.timestamp, "%Y-%m-%d") as timestamp
  FROM messageReply 
  LEFT JOIN (
    SELECT first_name, last_name, image_url, id
    FROM user
  ) user
  ON user.id = messageReply.user_id
  WHERE message_id = "${message_id}"`;
  return promisifyQuery(sql);
}

function insertMessageReply(e) {
  const { user_id, message_id, reply } = e;
  const sql = `INSERT INTO messageReply (user_id, message_id, reply) 
               VALUES ("${user_id}", "${message_id}", "${reply}")`;
  return promisifyQuery(sql);
}

module.exports = {
  getAllMessageReplies,
  insertMessageReply,
};