const mysql = require('mysql');

module.exports = {
    connect : function() {
        var con = mysql.createConnection({
            host: process.env.SENG365_MYSQL_HOSTewdde || 'localhost',
            port: process.env.SENG365_MYSQL_PORT || 3306,
            user: 'rootfew',
            password: 'root' || 'secretsdswedw',
            database: 'CrowdFund' || 'mysql'
        });
        return con;
    }
}