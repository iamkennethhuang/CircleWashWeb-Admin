const router = require('express').Router();
const Staff = require('../models/staff');
let PendingStaff = require('../models/pendingStaff');
const {authRole} = require('../middlewares/role');
const {authUser} = require('../middlewares/authenticate');

router.get('/all', authUser, authRole('admin'), (req, res) => {
    PendingStaff.find({status: true}, 
        function(err, docs){
            if(err) {throw err};
            if(docs) {
                res.send(docs);
            }
    })
})

router.post('/approve', authUser, authRole('admin'), (req, res) => {
    PendingStaff.findByIdAndUpdate(req.body._id, 
        {status: false, approveStaff: req.user, approveTime: new Date()}, //need to be update
        async (err, doc) => {
            if (err) throw err;
            if (doc) {
                const newStaff = new Staff({
                    email: doc.email,
                    password: doc.password,
                    encryptPassword : doc.encryptPassword,
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    role: "support",
                    perms: []
                });
                await newStaff.save();
                res.send({message: "Staff succefully added"});
            if(!doc){
                res.status(404).send({message: "No such user in pending list"});
            }}
    })
})

router.delete('/deny', authUser, authRole('admin'), (req, res) => {
    PendingStaff.findByIdAndRemove(req.body._id,
    (err, docs) => {
        if (err){
            throw err;
        }
        if (docs) {
            res.send(docs);
        }
        if (!docs){
            res.send({message: 'Pending Staff not found'});
        }
    }
)})
module.exports = router;