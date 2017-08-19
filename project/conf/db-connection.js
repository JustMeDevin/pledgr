const mysql = require('mysql');

module.exports = {
    connect : connect,
    createDatabase : createDatabase
}

function connectForDBCreation() {
    let con = mysql.createConnection({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 3306,
        user: 'root',
        password: 'secret' || 'root',
    });
    return con;
}

function connect() {
    let con = mysql.createConnection({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 3306,
        user: 'root',
        password: 'secret' || 'root',
        database: 'crowdfunder'
    });
    return con;
}

function createDatabase() {
    setTimeout(function () {
        createDatabaseTables()
    }, 20000)
}

function createDatabaseTables(){
    let conDB = connectForDBCreation();

    conDB.query("CREATE DATABASE crowdfunder", function (err, result) {
        if (err){
            console.log(err);
        }else{
            conDB.end();
            let con = connect();
            con.query("CREATE TABLE `Backers` (`id` int(11) NOT NULL,`amount` int(11) NOT NULL,`anonymous` tinyint(1) NOT NULL,`projectID` int(11) DEFAULT NULL)", function(err, rows, fields){
                if(err){
                    console.log(err);
                }
            });

            con.query("CREATE TABLE `Cards` (`authToken` char(50) NOT NULL,`userID` int(11) NOT NULL,`projectID` int(11) NOT NULL)", function(err, rows, fields){
                if(err){
                    console.log(err);
                }
            });

            con.query("CREATE TABLE `Creators` (`id` int(11) NOT NULL,`projectID` int(11) NOT NULL,`name` char(20) NOT NULL DEFAULT '')", function(err, rows, fields){
                if(err){
                    console.log(err);
                }else{
                    let con = connect();
                    con.query("INSERT INTO `Creators` (`id`, `projectID`, `name`) VALUES(1,1,'Devin'),(1,7,'Devin'),(2,7,'Shay'),(1,8,'Devin'),(2,8,'Shay'),(3,8,'Glen'),(3,9,'Glen');", function(err, rows, fields){
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });

            con.query("CREATE TABLE `Images` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,PRIMARY KEY (`id`))", function(err, rows, fields){
                if(err){
                    console.log(err);
                }
            });

            con.query("CREATE TABLE `Projects` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`creationDate` datetime DEFAULT NULL,`title` varchar(25) NOT NULL DEFAULT '',`subtitle` varchar(30) NOT NULL DEFAULT '',`description` varchar(500) NOT NULL DEFAULT '',`imageUri` varchar(100) DEFAULT NULL,`target` int(20) NOT NULL,`currentPledged` int(11) DEFAULT '0',`numberOfBackers` int(11) DEFAULT NULL,`open` tinyint(1) DEFAULT NULL,`backers` int(11) unsigned DEFAULT NULL,PRIMARY KEY (`id`))", function(err, rows, fields){
                if(err){
                    console.log(err);
                }else{
                    let con = connect();
                    con.query("INSERT INTO `Projects` (`id`, `creationDate`, `title`, `subtitle`, `description`, `imageUri`, `target`, `currentPledged`, `numberOfBackers`, `open`, `backers`) VALUES (1,'2017-08-19 06:32:16','Smart Butter Knife','spread better with AI','butterKnife is the lastest in smart home technology',NULL,20,0,NULL,1,NULL), (7,'2017-08-19 06:42:26','Smart Fork','knows what your eating','the new smart fork will change your life',NULL,100000,0,NULL,NULL,NULL), (8,'2017-08-19 06:43:43','Picture Book','a book of pictures','a really good book of really good pictures',NULL,40000,0,NULL,NULL,NULL), (9,'2017-08-19 06:45:22','Smarter Phone','smarter than a smart Phone','can do more things than ever',NULL,7000000,0,NULL,NULL,NULL);", function(err, rows, fields){
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });

            con.query("CREATE TABLE `Rewards` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`amount` int(11) NOT NULL,`description` varchar(100) NOT NULL DEFAULT '',`projectID` int(11) NOT NULL,PRIMARY KEY (`id`))", function(err, rows, fields){
                if(err){
                    console.log(err);
                }else{
                    let con = connect();
                    con.query("INSERT INTO `Rewards` (`id`, `amount`, `description`, `projectID`) VALUES (1,10,'a smart butter knife',1), (3,100,'one fork',7), (4,200,'two fork',7), (5,300,'all the forks',7), (6,10,'a thank you',8), (7,20,'t-shirt',8), (8,30,'the picture book',8), (9,4,'a card',9), (10,40,'a screen protector',9), (11,2000,'a smarter phone',9);", function(err, rows, fields){
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });

            con.query("CREATE TABLE `Users` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`username` varchar(11) NOT NULL DEFAULT '',`location` varchar(15) NOT NULL DEFAULT '',`email` varchar(25) NOT NULL DEFAULT '',`password` varchar(20) NOT NULL DEFAULT '',`sessionToken` varchar(64) DEFAULT '',PRIMARY KEY (`id`))", function(err, rows, fields){
                if(err){
                    console.log(err);
                }else{
                    let con = connect();
                    con.query("INSERT INTO `Users` (`id`, `username`, `location`, `email`, `password`, `sessionToken`) VALUES (1,'Devin','Christchurch','devin@gmail.com','test','20088b47-1f19-f854-e476-d65ee3101752'), (2,'Shay','Wellington','shay@gmail.com','test',''), (3,'Glen','Russia','glen@gmail.com','test','');", function(err, rows, fields){
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });
            con.end();
        }
    });
}
