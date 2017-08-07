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
        res.status(201).send("OK");
    }else{
        console.log({ "ERROR" : "Error inserting user" });
        res.send ({"ERROR" : "Error inserting user"});
    }
});

app.listen(3000 , function() {
    console.log ( 'listening on port: ' + 3000 );
});