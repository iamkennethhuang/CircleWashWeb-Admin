const router = require('express').Router();
const sendGridController = require('../controllers/sendGridController');
const Email = require ('../models/email');

function saveEmail(req, res){
        const newEmail = new Email({
            subject: 'Complaint Reply',
            information: req.body.information,
            authorEmail: 'customercare@circlewash.net',
            recipientEmail: req.body.recipientEmail,
            sentTime: new Date(),
            senderType: req.user.role,
            sender: req.user,
            fileCase: req.body.fileCase,
            fileCaseId: req.body.caseId
        })
        newEmail.save()
        .then(() => {
            res.send({message: 'Email is successfullt send and stored'});
        })
        .catch(err => res.send({message: 'from email saving', Error: err}))
}

router.post('/case/reply', (req, res) => {
    //need to be implement
    console.log(req);
})

router.post('/case/send', async (req, res) => {
    sendGridController.caseSend(req, res, saveEmail);
})

router.get('/case', (req, res) => {
    Email.find({fileCaseId: req.query.caseId})
    .then(emails => res.send(emails))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;