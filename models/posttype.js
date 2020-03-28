const {promisifyQuery} = require('./helperFunctions.js');

function getPostTypes() {
  const sql = `SELECT type FROM posttype`;
  return promisifyQuery(sql)
}