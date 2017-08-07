const databaseConnection = require('./DatabaseConnection');

module.exports = {
    addUser : function(user_data){
        const con = databaseConnection.connect();
        console.log(user_data);
        con.connect(function(err) {
            if (!err) {
                console.log("Connected to database");
                let username = user_data['username'].toString();
                let user_id = user_data['user_id']
                let location = user_data['location'].toString();
                let email = user_data['email'].toString();
                let password = user_data['password'].toString();

                let values = [user_id, username, location, email, password];

                const sql = "INSERT INTO Users (user_id, username, location, email, password) VALUES ?";
                con.query(sql, values, function (err, result) {
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