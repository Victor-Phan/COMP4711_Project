const {promisifyQuery} = require('./helperFunctions.js');

function getPostTypes() {
  const sql = `SELECT * FROM posttype`;
  return promisifyQuery(sql)
}

module.exports = {
  getPostTypes
}