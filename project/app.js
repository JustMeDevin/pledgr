
const userRoutes = require('./users/users.routes')
const projectRoutes = require('./projects/projects.routes')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const databaseConnection = require('./conf/db-connection');
databaseConnection.createDatabase();
app.use(bodyParser.json());

//There is some callback hell in here that given more time I would swap out for promises.

//app waits 20 seconds before creating database.

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.listen(4941, function () {
    console.log('listening on port: ' + 4941);
});