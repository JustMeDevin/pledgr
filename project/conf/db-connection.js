const mysql = require('mysql');
//const mysqlDatabase = (process.env.SENG365_MYSQL_HOST) ? 'mysql' : 'CrowdFund';

module.exports = {
    connect : connect,
    createDatabase : createDatabase
}

function connect() {
    let con = mysql.createConnection({
        host: 'localhost' || process.env.SENG365_MYSQL_HOST ,
        port: 3306 || process.env.SENG365_MYSQL_PORT,
        user: 'root',
        password: 'root' || 'secret',
        database: 'CrowdFund' || 'mysql'
    });
    return con;
 }

function createDatabase(){
    let con = connect();
    con.query("CREATE TABLE `Backers` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`amount` int(11) NOT NULL,`anonymous` tinyint(1) NOT NULL,`card` int(11) DEFAULT NULL,`projectID` int(11) DEFAULT NULL,PRIMARY KEY (`id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Cards` (`authToken` int(11) unsigned NOT NULL AUTO_INCREMENT,`userID` int(11) NOT NULL,PRIMARY KEY (`authToken`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Creators` (`id` int(11) NOT NULL,`projectID` int(11) NOT NULL,`name` char(20) NOT NULL DEFAULT '')", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Images` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,PRIMARY KEY (`id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Projects` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`creationDate` datetime DEFAULT NULL,`title` varchar(25) NOT NULL DEFAULT '',`subtitle` varchar(30) NOT NULL DEFAULT '',`description` varchar(500) NOT NULL DEFAULT '',`imageUri` varchar(100) DEFAULT NULL,`target` int(20) NOT NULL,`currentPledged` int(11) DEFAULT '0',`numberOfBackers` int(11) DEFAULT NULL,`open` tinyint(1) NOT NULL,`backers` int(11) unsigned DEFAULT NULL,PRIMARY KEY (`id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Rewards` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`amount` int(11) NOT NULL,`description` varchar(100) NOT NULL DEFAULT '',`projectID` int(11) NOT NULL,PRIMARY KEY (`id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Users` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`username` varchar(11) NOT NULL DEFAULT '',`location` varchar(15) NOT NULL DEFAULT '',`email` varchar(25) NOT NULL DEFAULT '',`password` varchar(20) NOT NULL DEFAULT '',`sessionToken` varchar(64) DEFAULT '',PRIMARY KEY (`id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

}
