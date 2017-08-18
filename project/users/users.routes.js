const user = require('./user.repository');
const router = require('express').Router();
const validator = require('../conf/validation');

const middleware = (req, res, next) => {
    validator.isValidToken(req.get('X-Authorization'), function callback(authorized){
        if (authorized){
            next(); // if we have a valid token, we can proceed 
        } else {
            res.sendStatus(401); // otherwise respond with 401 unauthorized 
        }
    }); 
}

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
    //let currentUserID = validator.currentUser.user_id;
    let user_data = req.body;
    user.updateUser(id, user_data, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.post('/logout', validator.authMiddleware, function (req, res) {
    let token = req.get('X-Authorization');
    user.logoutUser(token, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.delete('/:id', validator.authMiddleware, function (req, res) {
    let id = req.params.id;
    user.deleteUser(id, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});


module.exports = router;
