const { connection } = require('../configs/mysql.config');

function selectUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user where username='${username}'`, function(err, result) {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      } else {
        resolve(result);
      }
    })
  })
}

function addUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO user (id, username, created_at) VALUES (NULL, '${username}', CURRENT_TIMESTAMP)`, function(err, result) {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      } else {
        resolve(true);
      }
    })
  })
  
}

module.exports = {
  selectUser, addUser
}