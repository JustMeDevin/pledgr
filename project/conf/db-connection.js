const mysql = require('mysql');
const mysqlDatabase = (process.env.SENG365_MYSQL_HOST) ? 'mysql' : 'CrowdFund';

module.exports = {
    connect : connect,
    createDatabase : createDatabase
}

function connect() {
    let con = mysql.createConnection({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 3306,
        user: 'root',
        password: 'root' || 'secret',
        database: mysqlDatabase
    });
    return con;
 }

function createDatabase(){
    let con = connect();
    con.query("CREATE TABLE `Backers` (`user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,`amount` int(11) NOT NULL,`anonymous` tinyint(1) NOT NULL, `card` int(11) DEFAULT NULL,PRIMARY KEY (`user_id`));", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Cards` (`authToken` int(11) unsigned NOT NULL AUTO_INCREMENT,`user_id` int(11) NOT NULL,PRIMARY KEY (`authToken`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Creators` (`creator_id` int(11) unsigned NOT NULL,`project_id` int(11) NOT NULL,PRIMARY KEY (`creator_id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Images` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,PRIMARY KEY (`id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Projects` (`project_id` int(11) unsigned NOT NULL AUTO_INCREMENT,`creationDate` datetime DEFAULT NULL,`title` varchar(25) NOT NULL DEFAULT '',`subtitle` varchar(30) NOT NULL DEFAULT '',`description` varchar(500) NOT NULL DEFAULT '',`image_url` varchar(100) DEFAULT NULL,`target` int(20) NOT NULL,`currentPledged` int(11) DEFAULT NULL,`numberOfBackers` int(11) DEFAULT NULL,`open` tinyint(1) NOT NULL,`backers` int(11) unsigned DEFAULT NULL,PRIMARY KEY (`project_id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Rewards` (`reward_id` int(11) unsigned NOT NULL AUTO_INCREMENT,`amount` int(11) NOT NULL,`description` varchar(100) NOT NULL DEFAULT '',`project_id` int(11) NOT NULL,PRIMARY KEY (`reward_id`))", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

    con.query("CREATE TABLE `Users` (`user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,`username` varchar(11) NOT NULL DEFAULT '',`location` varchar(15) NOT NULL DEFAULT '',`email` varchar(25) NOT NULL DEFAULT '',`password` varchar(20) NOT NULL DEFAULT '',`session_token` varchar(64) DEFAULT '',PRIMARY KEY (`user_id`)) ", function(err, rows, fields){
        if(err){
            console.log(err);
        }
    });

}
