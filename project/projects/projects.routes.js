const project = require('./project.repository');
const reward = require('../rewards/reward.repository');
const router = require('express').Router();
const validator = require('../conf/validation');

router.get('', function (req, res) {
    let startIndex = req.query.startIndex;
    let count = req.query.count;
    project.getProjects(startIndex, count, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.post('/', validator.authMiddleware, function (req, res) {
    let projectData = req.body;
    project.createProject(projectData, function callback(status, response) {
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
    let updatedData = req.body;
    project.updateProject(id, updatedData, function callback(status, response) {
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
    let pledgeData = req.body;
    project.pledge(id, pledgeData, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.get('/:id/rewards', function (req, res) {
    let id = req.params.id;
    reward.getReward(id, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.put('/:id/rewards', validator.authMiddleware, function (req, res) {
    reward.loginUser(loginParams, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

module.exports = router;