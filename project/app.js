const user = require('./User');
const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.post('/users', function(req, res){
    let user_data = req.body;
    let result = user.addUser(user_data);
    if(result){
        res.send({ "SUCCESS" : "Successfully created user" });
    }else{
        console.log({ "ERROR" : "Error inserting user" });
        res.send ({"ERROR" : "Error connecting to database"});
    }
});

app.listen(3000 , function() {
    console.log ( 'listening on port: ' + 3000 );
});