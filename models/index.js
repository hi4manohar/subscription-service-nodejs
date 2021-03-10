const { connection } = require('../configs/mysql.config');

function selectUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user where username='${username}'`, function(err, result) {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      }
      
      resolve(result);
    })
  })
}

function addUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO user (id, username, created_at) VALUES (NULL, '${username}', CURRENT_TIMESTAMP)`, function(err, result) {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      }
      resolve(true);
    })
  })
  
}

function getPlan(planId) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM plans where plan_id='${planId}'`, (err, result) => {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      }
      resolve(result);
    });
  })
}

function getSubscription(userid) {

  return new Promise((resolve, reject) => {
    connection.query(`SELECT plans.plan_id, plans.validty as valid_till, DATE_FORMAT(subscriptions.start_date, '%Y-%m-%d') as start_date FROM subscriptions inner join plans on plans.id=subscriptions.plan_id where user_id='${userid}'`, (err, result) => {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      }
      resolve(result);
    });
  })

}

function addSubscription(userid, planid, startdate) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO subscriptions (id, user_id, plan_id, start_date) VALUES (NULL, '${userid}', '${planid}', '${startdate}')`, (err, result) => {
      if( err ) {
        console.log(err);
        reject(new Error(err));
      }
      resolve(true);
    });
  })
}

module.exports = {
  selectUser,
  addUser,
  getPlan,
  getSubscription,
  addSubscription
}