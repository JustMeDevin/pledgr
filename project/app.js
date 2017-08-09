
const userRoutes = require('./users/users.routes')
const projectRoutes = require('./projects/projects.routes')
const rewardRoutes = require('./rewards/rewards.routes')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/rewards', rewardRoutes);

app.listen(3000, function () {
    console.log('listening on port: ' + 3000);
});