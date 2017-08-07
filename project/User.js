const databaseConnection = require('./DatabaseConnection');

module.exports = {
    addUser : function(user_data){
        const con = databaseConnection.connect();
        return con.connect(function(err) {
            if (!err) {
                console.log("Connected to database");
                const sql = "INSERT INTO Users (user_id, username, location, email, password) VALUES ?)";
                let values = [[parseInt(user_data.user.id), user_data.user.username, user_data.user.location, user_data.user.email, user_data.password]];
                return con.query(sql, [values], function (err, result) {
                    con.end();
                    if (!err) {
                        return true;
                    } else {
                        console.log({"ERROR": "Error inserting user"});
                        return false;
                    }
                });
            } else {
                console.log("Error connecting to database");
                return false;
            }
        })
    }
}