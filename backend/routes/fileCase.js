const router = require('express').Router();
let FileCase = require('../models/fileCase');

router.get('/', (req, res) => {
    FileCase.find({_id: req.query.caseId})
    .then(filecase => res.send(filecase))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/file', (req, res) => {
    FileCase.find({reportFileId: (req.query.fileId)},
        function(err, docs){
            if(err) {throw err};
            if(docs) {
                res.send(docs);
            }
        })
});

router.get('/all', (req, res) => {
    FileCase.find({status: req.query.status},
        function(err, docs){
            if(err) {throw err};
            if(docs) {
                res.send(docs);
            }
        })
});

module.exports = router;