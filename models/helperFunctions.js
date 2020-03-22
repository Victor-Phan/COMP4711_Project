const { db } = require("../db");

function promisifyQuery(sql) {
  return new Promise((resolve, reject) => {
    db.execute(sql, (err, data, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = {
  promisifyQuery
};
