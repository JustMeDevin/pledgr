const user = require('./user.repository');
const router = require('express').Router();
const validator = require('../conf/validation');

router.post('/', function (req, res) {
    let userData = req.body;
    user.addUser(userData, function callback(status, response) {
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

router.put('/:id', validator.authMiddleware, function (req, res) {
    let id = req.params.id;
    let user_data = req.body;
    if(validator.currentUser.userID === parseInt(id)){
        user.updateUser(id, user_data, function callback(status, response) {
            res.status(status).send(JSON.stringify(response));
        });
    }else{
        res.status(403).send(JSON.stringify("Forbidden - account not owned"));
    }
});

router.post('/logout', validator.authMiddleware, function (req, res) {
    let token = req.get('X-Authorization');
    user.logoutUser(token, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.delete('/:id', validator.authMiddleware, function (req, res) {
    let id = req.params.id;
    if(validator,currentUser.userID === parseInt(id)){
        user.deleteUser(id, function callback(status, response) {
            res.status(status).send(JSON.stringify(response));
        });
    }else{
        res.status(403).send(JSON.stringify("Forbidden - account not owned"));
    }
});


module.exports = router;
