const mysql = require('mysql');
const mysqlDatabase = (process.env.SENG365_MYSQL_HOST) ? 'mysql' : 'CrowdFund';

module.exports = {
    connect : connect,
    createDatabase : createDatabase
}

function createDatabase(){
}

function connect() {
    var con = mysql.createConnection({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 3306,
        user: 'root',
        password: 'root' || 'secret',
        database: mysqlDatabase
    });
    return con;
 }