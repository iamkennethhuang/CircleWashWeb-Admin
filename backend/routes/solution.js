const router = require('express').Router();
const Solution = require ('../models/solution');
const FileCase = require('../models/fileCase');
const ReportFile = require('../models/reportFile');

router.post('/', (req, res) => {
    const newSolution = new Solution({
        solutionType: req.body.solutionType,
        amount: req.body.amount,
        refundType: req.body.refundType,
        staffCreated: req.user,
        approve: req.body.approve,
    })
    newSolution.save()
    .then(() => {
        FileCase.findByIdAndUpdate(req.body.fileCase._id, 
            {status: req.body.status, solution: newSolution}, 
            (err, docs) => {
                if(err) {throw err};
                if(docs) {
                    if(req.body.status === 'Handled'){
                        console.log(docs);
                        ReportFile.findByIdAndUpdate(req.body.fileCase.reportFileId, 
                            {status: true},
                            (reportErr, reportDocs) => {
                                if (reportErr) {throw reportErr};
                                if(reportDocs) {
                                    res.send({message: 'successfully update file report and file case'});
                                }
                            })
                    }
                    else{
                        res.send({message: 'successfully update file case'});
                    }
                };
            })
    })
    .catch(err => {
        console.log(err)
        res.send({message: 'from email saving', Error: err})})
})

router.put('/deny', (req, res) => {
    const solutionId = req.body.fileCase.solution._id;
    FileCase.findByIdAndUpdate(req.body.fileCase._id, 
        {solution: null}, 
        (err, docs) => {
            if(err) {throw err};
            if(docs) {
                Solution.findOneAndDelete({_id: solutionId}, 
                    (solErr, solDocs) => {
                    if (solErr) throw solErr;
                    if(solDocs){
                        res.send({message: 'successfully update file case and solution'});
                    }
                    else{
                        res.send({message: 'successfully update file case'});
                    }
                })
            }
            else{
                res.send({message: 'fail to update file case'});
            } 
    })
})

router.put('/approve', (req, res) => {
    Solution.findByIdAndUpdate(req.body.fileCase.solution._id, 
        {approve: true}, 
        (err, docs) => {
            if (err) throw err;
            if(docs){
                FileCase.findByIdAndUpdate(req.body.fileCase._id, 
                    {status: 'Handled', solution: docs}, 
                    (caseErr, caseDocs) => {
                        if(caseErr) {throw caseErr};
                        if(caseDocs) {         
                            res.send({message: 'successfully update file case and solution'});
                        }
                        else{
                            res.send({message: 'successfully to update solution'});
                        }
                })
            }
            else{
                res.send({message: 'fail to update solution'});
            }
    })
})

module.exports = router;