const router = require('express').Router();
let Staff = require('../models/staff');
const {authRole} = require('../middlewares/role');
const {authUser} = require('../middlewares/authenticate');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send(req.user);
});

router.get('/all', authUser, authRole('admin'), (req, res) => {
    Staff.find({}, 
        function(err, docs){
            if(err) {throw err};
            if(docs) {
                res.send(docs);
            }
    })
})

router.put('/role', authUser, authRole('admin'), (req, res) => {
    Staff.findByIdAndUpdate(req.body.staffId, 
        {role: req.body.role},
        (err, docs) => {
            if(err) {throw err};
            if(docs) {res.send(docs)};
        })
})

router.put('/name', (req, res) => {
    if(req.user){
        Staff.findByIdAndUpdate(req.user._id, 
            {firstName: req.body.firstName, lastName: req.body.lastName}, 
            (err, docs) => {
                if(err) {throw err};
                if(docs) {res.send(docs)};
            })
    }
});

router.put('/password', async (req, res) => {
    if(req.user){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        Staff.findByIdAndUpdate(req.user._id, 
            {password: hashedPassword}, 
            (err, docs) => {
                if(err) {throw err};
                if(docs) {res.send(docs)};
            })
    }
});

router.delete('/logout', (req, res) => {
    req.logOut();
    res.send('successfulyl logout')
})

module.exports = router;