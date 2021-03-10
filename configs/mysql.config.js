var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'subscription-service'
});
 
connection.connect();

module.exports = {
  connection: connection
}