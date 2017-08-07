const mysql = require('mysql');

module.exports = {
    connect : function() {
        var con = mysql.createConnection({
            host: process.env.SENG365_MYSQL_HOST || 'localhost',
            port: process.env.SENG365_MYSQL_PORT || 3306,
            user: 'root',
            password: 'root' || 'secret',
            database: 'CrowdFund'
        });
        return con;
    }
}