const user = require('./reward.repository');
const router = require('express').Router();

const middleware = (req, res, next) => {
    //if (validator.isValidToken(req.get('X-Authorization'), req.params.id)) {
        if (true) {
        next(); // if we have a valid token, we can proceed 
    } else {
        res.sendStatus(401); // otherwise respond with 401 unauthorized 
    }
}

router.get('/projects/:id/rewards', function (req, res) {
    user.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.put('/projects/:id/rewards', middleware, function (req, res) {
    user.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

module.exports = router;