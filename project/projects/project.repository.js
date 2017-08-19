const databaseConnection = require('../conf/db-connection');
const user = require('../users/users.routes');


module.exports = {
    createProject: function(projectData, callback) {
        const con = databaseConnection.connect();
        let timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        con.connect(function (err) {
            if (!err) {
                const sql = "INSERT INTO Projects (title, creationDate, subtitle, description, target) VALUES ?";
                let values = [[ 
                    projectData.title, 
                    timeStamp,
                    projectData.subtitle, 
                    projectData.description, 
                    projectData.target
                ]];
                con.query(sql, [values], function (err, result) {
                    if (!err) {
                        let projectID = result.insertId;
                        const sql = "INSERT INTO Creators (id, projectID, name) VALUES ?";
                        let creatorValues = [];
                        for(var i = 0; i < projectData.creators.length; i++)
                            creatorValues.push([projectData.creators[i].id, projectID, projectData.creators[i].name]);
                        con.query(sql, [creatorValues], function (err, result) {
                            if (!err) {
                                const sql = "INSERT INTO Rewards (id, amount, description, projectID) VALUES ?";
                                let rewardValues = [];
                                for(var i=0; i< projectData.rewards.length; i++)
                                    rewardValues.push([projectData.rewards[i].id, projectData.rewards[i].amount, projectData.rewards[i].description, projectID]);
                                con.query(sql, [rewardValues], function (err, result) {
                                    con.end();
                                    if (!err) {
                                        callback(201, "OK");
                                    } else {
                                        callback(400, "Malformed Data");
                                    }
                                });
                            } else {
                                callback(400, "Malformed Data");
                            }
                        });
                    } else {
                        callback(400, "Malformed Data");
                    }
                });
            } else {
                callback(500, "Malformed Data");
            }
        })
    },

    getProject: function (id, callback){
        const con = databaseConnection.connect();
        con.connect(function (err) {
            if (!err) {
                const sql = "SELECT * FROM Projects WHERE id = ?";
                let values = [[con.escape(parseInt(id))]]
                con.query(sql, [values], function (err, result, fields) {
                    if (!err) {
                        if(result.length > 0){
                            let projectDetails = result[0];
                            const sql = "SELECT id, name FROM Creators WHERE projectID = ?";
                            con.query(sql, [id], function (err, result, fields) {
                                if (!err) {
                                    if(result.length > 0){
                                        let creators = result;
                                        const sql = "SELECT id, amount, description FROM Rewards WHERE projectID = ?";
                                        con.query(sql, [id], function (err, result, fields) {
                                            if (!err) {
                                                if(result.length > 0){
                                                    let rewards = result;
                                                    const sql = "SELECT id, amount FROM Backers WHERE projectID = ?";
                                                    let values = [[con.escape(parseInt(id))]]
                                                    con.query(sql, [values], function (err, result, fields) {
                                                        if (!err) {
                                                            if(result.length > 0){
                                                                let backers = result;
                                                                let constructedResult = constructGetProject(projectDetails, rewards, creators, backers);
                                                                callback(200, constructedResult);
                                                            }else{
                                                                let constructedResult = constructGetProject(projectDetails, rewards, creators, backers=[]);
                                                                callback(200, constructedResult);
                                                            }
                                                        } else {
                                                            callback(400, "Invalid id supplied");
                                                        }
                                                    });
                                                }else{
                                                    callback(404, "not Found");
                                                }
                                            } else {
                                                callback(400, "Invalid id supplied");
                                            }
                                        });
                                    }else{
                                        callback(404, "not Found");
                                    }
                                } else {
                                    callback(400, "Invalid id supplied");
                                }
                            });
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
                const sql = "SELECT id, title, subtitle, image_url FROM PROJECTS LIMIT ?";
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
                        //callback(400, "Invalid id supplied");
                        callback(400, err);
                    }
                });
            }else {
                callback(500, "Unexpected Server Error");
            }
        });
    },

    updateProject: function (projectID, projectData, callback){
        const con = databaseConnection.connect();
        let open = 0;
            con.connect(function (err) {
                if (!err) {
                    let values = [ 
                        projectData.open,
                        projectID
                    ];
                    const sql = "UPDATE Projects SET open = ? WHERE id = ?";
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
                        project_data.title, 
                        project_data.subtitle, 
                        project_data.description, 
                        project_data.target
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

function constructGetProject(projectData, rewards, creators, backers){
    return projectDetails = {
        project: {
            id: projectData.project_id,
            creationDate: projectData.creationDate,
            data: {
                title: projectData.title,
                subtitle: projectData.subtitle,
                description: projectData.description,
                imageUri: projectData.imageUri,
                target: projectData.target,
                creators,
                rewards,
            }
        },
        progress: {
            target: projectData.target,
            currentPledged: projectData.currentPledged,
            numberOfBackers: backers.length 
        },
        backers
    };
}