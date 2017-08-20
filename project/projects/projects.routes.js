const project = require('./project.repository');
const reward = require('../rewards/reward.repository');
const router = require('express').Router();
const validator = require('../conf/validation');
var multer  = require('multer');
var upload = multer({ dest: 'tmp/uploads/' });

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
    let userID = validator.currentUser.userID;
    project.updateProject(id, updatedData, userID, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

router.get('/:id/image', function (req, res) {
    let id = req.params.id;
    project.getImage(id, function callback(status, response, found) {
        if(found){
            res.setHeader('Content-Type', 'image/png');
            res.status(status).download(response[0], response[1]);
        }else{
            res.status(status).send(JSON.stringify(response));
        }
    });
});

router.put('/:id/image', [validator.authMiddleware, upload.single('image')], function (req, res) {
    let id = req.params.id;
    if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
        project.addImage(req.file, id, validator.currentUser.userID, function callback(status, response) {
            res.status(status).send(JSON.stringify(response));
        });
    }else{
        res.status(400).send(JSON.stringify("Malformed request"));
    }
    
});

router.post('/:id/pledge', validator.authMiddleware, function (req, res) {
    let id = req.params.id;
    let pledgeData = req.body;
    let user = validator.currentUser.userID;
    project.pledge(user, id, pledgeData, function callback(status, response) {
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
    let id = req.params.id;
    let rewardData = req.body;
    let token = req.get('X-Authorization');
    reward.updateRewards(id, rewardData, token, function callback(status, response) {
        res.status(status).send(JSON.stringify(response));
    });
});

module.exports = router;