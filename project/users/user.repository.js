const databaseConnection = require('../conf/db-connection');

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
    },

    loginUser: function (loginParams, callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT user_id, password FROM USERS WHERE username = ?";
                let values = [[con.escape(loginParams.username)]]
                con.query(sql, [values], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(checkPassword(result, loginParams.password)){
                            callback(200, generateUniqueID(result[0].user_id));
                        }else{
                            callback(400, "Invalid username/password supplied");
                        }
                    } else {
                        callback(400, "Invalid username/password supplied");
                    }
                });
            }else {
                callback(500, "Unexpected Server Error");
            }
        });
    },

    getUser: function (id, callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT user_id, username, location, email FROM USERS WHERE user_id = ?";
                let values = [[con.escape(parseInt(id))]]
                con.query(sql, [values], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        console.log(result);
                        if(result.length > 0){
                            callback(200, result[0]);
                        }else{
                            callback(404, "User not found");
                        }
                    } else {
                        callback(400, "Invalid id supplied");
                    }
                });
            }else {
                callback(500, "Unexpected Server Error");
            }
        });
    }
}

function checkPassword(actualPass, passAttempt){
    if(actualPass.length > 0){
        return actualPass[0].password === passAttempt;
    }
}

function generateUniqueID(user_id){
    let uuid = guid();
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "UPDATE Users SET session_token = ? WHERE user_id = ?";
                con.query(sql, [uuid, user_id], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        return getTokenJSON(user_id);
                    } else {
                        console.log("error");
                    }
                });
            } else {
                console.log("unexpected error")
            }
        })
    return uuid;
}

function getTokenJSON(user_id){
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT user_id, session_token FROM USERS WHERE user_id = ?";
                con.query(sql, [user_id], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        return result[0];
                    } else {
                        console.log("error");
                    }
                });
            } else {
                console.log("unexpected error")
            }
        })
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
