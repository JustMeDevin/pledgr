const databaseConnection = require('../conf/db-connection');


module.exports = {
    addUser: function (userData, callback) {
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "INSERT INTO Users (username, location, email, password) VALUES ?";
                let values = [[ 
                    userData.user.username, 
                    userData.user.location, 
                    userData.user.email, 
                    userData.password
                ]];
                con.query(sql, [values], function (err, result) {
                    con.end();
                    if (!err) {
                        callback(201, "OK");
                    } else {
                        callback(400, err);
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
                const sql = "SELECT id, password FROM USERS WHERE username = ?";
                let values = loginParams.username;
                con.query(sql, [values], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(checkPassword(result, loginParams.password)){
                            let newToken = generateUniqueID(result[0].id);
                            updateToken(newToken, result[0].id);
                            let userDetails = {
                                token: newToken,
                                id: result[0].id
                            };
                            callback(200, userDetails);
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
                const sql = "SELECT id, username, location, email FROM USERS WHERE id = ?";
                con.query(sql, [id], function (err, result, fields) {
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
    },

    updateUser: function (userID, userData, callback){
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                let values = [
                    userData.user.username, 
                    userData.user.location, 
                    con.escape(userData.user.email), 
                    con.escape(userData.password),
                    userID
                ];
                const sql = "UPDATE Users SET username = ?, location = ?, email = ?, password = ? WHERE id = ?";
                con.query(sql, values, function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(result.affectedRows === 1){
                            callback(201, "User updated");
                        }
                    } else {
                        callback(404, "User not found");
                    }
                });
            } else {
                callback(500, "Unexpected server error");
            }
        })
    },

    logoutUser: function (token, callback){
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "UPDATE Users SET sessionToken = ? WHERE sessionToken = ?";
                con.query(sql, [null, token], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(result.affectedRows === 1){
                            callback(201, "OK");
                        }else{
                            callback(401, "Unauthorized - already logged out");
                        }
                    } else {
                        callback(404, "User not found");
                    }
                });
            } else {
                callback(500, "Unexpected server error");
            }
        })
    },

    deleteUser: function (userID, callback){
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "DELETE FROM Users WHERE id = ?";
                con.query(sql, [userID], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(result.affectedRows === 1){
                            callback(200, "User deleted");
                        }else{
                            callback(401, "Unauthorized - already logged out");
                        }
                    } else {
                        callback(404, "User not found");
                    }
                });
            } else {
                callback(500, "Unexpected server error");
            }
        })
    }
}

function checkPassword(actualPass, passAttempt){
    if(actualPass.length > 0){
        return actualPass[0].password === passAttempt;
    }
}

function generateUniqueID(userID){
    let uuid = guid();
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "UPDATE Users SET sessionToken = ? WHERE id = ?";
                con.query(sql, [uuid, userID], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        return getTokenJSON(userID);
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

function getTokenJSON(userID){
    const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT id, sessionToken FROM USERS WHERE id = ?";
                con.query(sql, [userID], function (err, result, fields) {
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

function updateToken(token, id){
    const con = databaseConnection.connect();
    con.connect(function (err) {
        if (!err) {
            const sql = "UPDATE Users SET sessionToken = ? WHERE id = ?";
            con.query(sql, [token, id], function (err, result, fields) {
                con.end();
                 
            });
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
