const user = require('./User');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.post('/users', function (req, res) {
    let user_data = req.body;
    user.addUser(user_data, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });

});

app.listen(3000, function () {
    console.log('listening on port: ' + 3000);
});