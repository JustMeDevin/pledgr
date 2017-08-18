const databaseConnection = require('../conf/db-connection');
const user = require('../users/users.routes');


module.exports = {
    createProject: function(project_data, callback) {
        const con = databaseConnection.connect();
        let timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        con.connect(function (err) {
            if (!err) {
                const sql = "INSERT INTO Projects (title, creationDate, subtitle, description, target) VALUES ?";
                let values = [[ 
                    con.escape(project_data.title), 
                    timeStamp,
                    con.escape(project_data.subtitle), 
                    con.escape(project_data.description), 
                    con.escape(project_data.target)
                ]];
                con.query(sql, [values], function (err, result) {
                    if (!err) {
                        let projectID = result.insertId;
                        const sql = "INSERT INTO Creators (creator_id, project_id, name) VALUES ?";
                        let creatorValues = [];
                        for(var i = 0; i < project_data.creators.length; i++){
                            creatorValues.push([project_data.creators[i].id, projectID, project_data.creators[i].name]);                            
                        }
                        con.query(sql, [creatorValues], function (err, result) {
                            if (!err) {
                                const sql = "INSERT INTO Rewards (reward_id, amount, description, project_id) VALUES ?";
                                let rewardValues = [];
                                for(var i=0; i< project_data.rewards.length; i++){
                                    rewardValues.push([project_data.rewards[i].id, project_data.rewards[i].amount, project_data.rewards[i].description, projectID]);                                    
                                }
                                con.query(sql, [rewardValues], function (err, result) {
                                    con.end();
                                    if (!err) {
                                        callback(201, "OK");
                                    } else {
                                        callback(400, "Malformed project data");
                                    }
                                });
                            } else {
                                callback(400, "Malformed project data");
                            }
                        });
                    } else {
                        callback(400, "Malformed project data");
                    }
                });
            } else {
                callback(500, "Unexpected Server Error");
            }
        })
    },

    getProject: function (id, callback){
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
    },

    getProjects: function (startIndex, count,  callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT project_id, title, subtitle, image_url FROM PROJECTS LIMIT ?";
                let values = [parseInt(startIndex), parseInt(count)];
                con.query(sql, [values], function (err, result, fields) {
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

    updateProject: function (project_id, project_data, callback){
        const con = databaseConnection.connect();
        let open = 0;
            con.connect(function (err) {
                if (!err) {
                    let values = [ 
                        project_data.open,
                        project_id
                    ];
                    const sql = "UPDATE Projects SET open = ? WHERE project_id = ?";
                    con.query(sql, values, function (err, result, fields) {
                        con.end();
                        if (!err) {
                            if(result.affectedRows === 1){
                                callback(201, "Ok");
                            }else{
                                callback(404, "Not found");
                            }
                        } else {
                            callback(400, "Malformed request");
                        }
                    });
                } else {
                    callback(500, "Unexpected server error");
                }
            })
        },

        pledge: function(id, pledge_data, callback) {
            const con = databaseConnection.connect();
            con.connect(function (err) {
                if (!err) {
                    const sql = "INSERT INTO Projects (title, subtitle, description, target) VALUES ?";
                    let values = [[ 
                        con.escape(project_data.title), 
                        con.escape(project_data.subtitle), 
                        con.escape(project_data.description), 
                        con.escape(project_data.target)
                    ]];
                    con.query(sql, [values], function (err, result) {
                        con.end();
                        if (!err) {
                            callback(201, "OK");
                        } else {
                            callback(400, "Malformed project data");
                        }
                    });
                } else {
                    callback(500, "Unexpected Server Error");
                }
            })
        }
}