const project = require('./project.repository');
const reward = require('../rewards/reward.repository');
const router = require('express').Router();

const middleware = (req, res, next) => {
    validator.isValidToken(req.get('X-Authorization'), function callback(authorized){
        if (authorized){
            next(); // if we have a valid token, we can proceed 
        } else {
            res.sendStatus(401); // otherwise respond with 401 unauthorized 
        }
    }); 
}

router.get('', function (req, res) {
    let startIndex = req.params.startIndex;
    let count = req.params.count;
    project.getProjects(startIndex, count, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.post('/', validator.authMiddleware, function (req, res) {
    let project_data = req.body;
    project.createProject(project_data, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    project.getProject(id, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.put('/:id', validator.authMiddleware, function (req, res) {
    let id = req.params.id;
    let updated_data = req.body;
    project.updateProject(id, updated_data, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.get('/:id/image', function (req, res) {
    user.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.put('/:id/image', validator.authMiddleware, function (req, res) {
    user.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.post('/:id/pledge', validator.authMiddleware, function (req, res) {
    let id = req.params.id;
    let pledge_data = req.body;
    projects.pledge(id, pledge_data, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.get('/:id/rewards', function (req, res) {
    reward.getReward(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.put('/:id/rewards', validator.authMiddleware, function (req, res) {
    user.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

module.exports = router;