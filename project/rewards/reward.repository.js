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
    },

    updateRewards: function (id, rewardData, token, callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT id FROM Users WHERE sessionToken = ?";
                con.query(sql, token, function (err, result, fields) {
                    if (!err) {
                        if(result.length == 0) {
                            callback(401, "Unauthorized - create account to update project");
                        }else{
                            const sql = "SELECT name FROM Creators WHERE id = ? AND projectID = ?";
                            let values = [result[0].id, parseInt(id)];
                            con.query(sql, values, function (err, result, fields) {
                                if (!err) {
                                    if (result.length == 0) {
                                        callback(403, "Forbidden - cannot pledge to own project - this is fraud!");
                                    } else {
                                        const sql = "DELETE FROM Rewards WHERE projectID = ?";
                                        con.query(sql, parseInt(id), function (err, result, fields) {
                                            if (!err) {
                                                const sql = "INSERT INTO Rewards (amount, description, projectID) VALUES ?";
                                                let rewardValues = [];
                                                for (var i = 0; i < rewardData.length; i++)
                                                    rewardValues.push([rewardData[i].amount, rewardData[i].description, id]);
                                                con.query(sql, [rewardValues], function (err, result, fields) {
                                                    con.end();
                                                    if (!err) {
                                                        callback(201, "OK");
                                                    } else {
                                                        callback(400, "Malformed request");
                                                    }
                                                });
                                            } else {
                                                callback(400, "Malformed request");
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    } else {
                        callback(401, "Unauthorized - create account to update project");
                    }
                });
            }
        })
    }
}