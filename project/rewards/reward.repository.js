const databaseConnection = require('../conf/db-connection');

module.exports = {
    getReward: function (id, callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT id, amount, description FROM Rewards WHERE projectID = ?";
                con.query(sql, id, function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(result.length > 0){
                            callback(200, result);
                        }else{
                            callback(404, "not Found");
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