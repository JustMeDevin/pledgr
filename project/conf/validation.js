const databaseConnection = require('../conf/db-connection');
const currentUser = {userID: undefined};

module.exports = {
    authMiddleware: function(req, res, next){
        isValidToken(req.get('X-Authorization'), function callback(authorized){
            if (authorized){
                next(); // if we have a valid token, we can proceed 
            } else {
                res.sendStatus(401); // otherwise respond with 401 unauthorized 
            }
        }); 
    }, 

    currentUser: currentUser
}

function isValidToken(token, callback){
    const con = databaseConnection.connect();
    con.connect(function (err) {
        if (!err) {
            const sql = "SELECT id FROM Users WHERE sessionToken = ?";
            con.query(sql, [token], function (err, result) {
                con.end();
                if (!err) {
                    if(result[0] && result[0].id){
                        currentUser.userID = result[0].id;
                        callback(true);
                    }else{
                        callback(false);
                    }
                } else {
                    callback(false);
                }
            });
        } else {
            callback(false);
        }
    })
}