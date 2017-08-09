const databaseConnection = require('./DatabaseConnection');

module.exports = {
    addUser: function (user_data, callback) {
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "INSERT INTO Users (username, location, email, password) VALUES ?";
                let values = [[ 
                    con.escape(user_data.user.username), 
                    con.escape(user_data.user.location), 
                    con.escape(user_data.user.email), 
                    con.escape(user_data.password)
                ]];
                con.query(sql, [values], function (err, result) {
                    con.end();
                    if (!err) {
                        callback(201, result.insertId);
                    } else {
                        callback(400, "Error inserting user");
                    }
                });
            } else {
                callback(500, "Unexpected Server Error");
            }
        })
    }
}