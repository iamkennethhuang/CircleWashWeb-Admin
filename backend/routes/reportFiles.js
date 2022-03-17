const router = require('express').Router();
let ReportFile = require('../models/reportFile');
let FileCase = require('../models/fileCase');
let Staff = require('../models/staff');
const sendGridController = require('../controllers/sendGridController');
const {authUser} = require('../middlewares/authenticate');

// next variable is call the following function
router.route('/').get(authUser, (req, res) => {
    ReportFile.find({status: (req.query.solvedStatus)}).sort({date: req.query.dataOrder})
    .then(reportFiles => res.send(reportFiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/unsolvedNum').get(authUser, (req, res) => {
    ReportFile.find({status: false})
    .then(reportFiles => res.send(String(reportFiles.length)))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/solvedNum').get(authUser, (req, res) => {
    ReportFile.find({status: true})
    .then(reportFiles => res.send(String(reportFiles.length)))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/totalNum').get(authUser, (req, res) => {
    ReportFile.find({})
    .then(reportFiles => res.send(String(reportFiles.length)))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/today').get(authUser, (req, res) => {
    const todayDate = new Date();
    const month = (todayDate.getMonth())
    const date =(todayDate.getDate())
    const year = (todayDate.getFullYear())

    const beginToday = (new Date(year,month,date));
    ReportFile.find({date: { $gte: beginToday}})
    .then(reportFiles => res.send(String(reportFiles.length)))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/month').get(authUser, (req,res) => {
    const todayDate = new Date();
    const month = (todayDate.getMonth());
    const year = (todayDate.getFullYear());
    const beginToday = (new Date(year,month,1));

    ReportFile.find({date: { $gte: beginToday}})
    .then(reportFiles => res.send(String(reportFiles.length)))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/next').get(authUser, (req, res) => {
    ReportFile.findById(req.query.fileId)
    .then(reportFile => 
        ReportFile.find({date: { $gt: (reportFile.date)}, status: (reportFile.status)}).limit(1)
        .then(report => (report.length !== 0) ? res.send(String(report[0]._id)) : res.send(String('no')))
        .catch(err => res.status(400).json("Error From Next: " + err))
        )
    .catch(err => res.status(404).json('Error From Id: ' + err));
    
});

router.route('/previous').get(authUser, (req, res) => {
    ReportFile.findById(req.query.fileId)
    .then(reportFile => 
        ReportFile.find({date: { $lt: (reportFile.date)}, status: (reportFile.status)}).sort({date: -1}).limit(1)
        .then(report => (report.length !== 0) ? res.send(String(report[0]._id)) : res.send(String('no')))
        .catch(err => res.status(400).json("Error From Next: " + err))
        )
    .catch(err => res.status(404).json('Error From Id: ' + err));
});

router.route('/add').post((req, res) => {
    const newReportFile = new ReportFile({
        userid: req.user === undefined ? null : req.user._id,
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        phone: Number(req.body.phone) !== null ? Number(req.body.phone) : null,
        machineType: req.body.machineType, 
        machineNo: Number(req.body.machineNo), 
        amount: Number(req.body.amount), 
        description: req.body.description, 
        date: Date.parse(req.body.date),
        status: req.body.status,
        payType: req.body.payType,
        fasCardNum: (req.body.payType === 'Coin' || req.body.payType === 'CreditCard') ? null : req.body.fasCardNum,
        creditCardNum: (req.body.payType === 'Coin' || req.body.payType === 'FasCard') ? null : req.body.creditCardNum,
    });
    newReportFile.save()
    .then(() => {
        Staff.find({}, 'email', function (err, docs) {
            const staffEmails = docs.map(single => single.email);
            const emailResult = sendGridController.sendSupportNotify(staffEmails);
            const newCase = new FileCase({
                open: true,
                user: (req.user) ? req.user : null,
                reportFile: newReportFile,
                reportFileId: newReportFile._id,
                solution: null,
                status: 'Unhandle'
            })
            newCase.save()
            .then(() => {
                res.send({email: emailResult, message: 'Successfully created report file and case'});
            })
         })
        
    })
    .catch(err => res.status(400).send({error: err, message: 'failed after creating case'}));
});

router.put('/updatestatus', authUser, (req, res) => {
    ReportFile.findByIdAndUpdate(req.body.fileId, 
        {status: req.body.status}, 
        (err, docs) => {
            if(err) {throw err};
            if(docs) {res.send(docs)};
        }
    )
});

//haven't test this function yet
router.delete('/remove', authUser, (req, res) => {
    ReportFile.findOneAndDelete({_id: req.body.fileId}, (err, docs) => {
        if (err) throw err;
        if(docs){
            res.json(docs);
        }
    })
});

router.route('/:id').get(authUser, (req, res) => {
    ReportFile.findById(req.params.id)
    .then(reportFiles => res.send(reportFiles))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;