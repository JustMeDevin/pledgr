const databaseConnection = require('../conf/db-connection');

module.exports = {
    getReward: function (id, callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT * FROM PROJECTS WHERE project_id = ?";
                let values = [[con.escape(parseInt(id))]]
                con.query(sql, [values], function (err, result, fields) {
                    con.end();
                    if (!err) {
                        if(result.length > 0){
                            callback(200, result[0]);
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