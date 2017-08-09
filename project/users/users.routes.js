const user = require('./user.repository');
const router = require('express').Router();

router.post('/', function (req, res) {
    let user_data = req.body;
    user.addUser(user_data, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.post('/login', function (req, res) {
    let loginParams = req.query;
    user.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    user.getUser(id, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

module.exports = router;
