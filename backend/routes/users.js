const router = require('express').Router();
let User = require('../models/user');

router.get('/', (req, res) => {
    res.send(req.user);
});

router.get('/islogin', (req, res) => {
    if(req.isAuthenticated()){ 
        res.send(true);
    }else{
        res.status(401).send({error: "User is not log in"}); 
    }
});

router.put('/name', (req, res) => {
    if(req.user){
        User.findByIdAndUpdate(req.user._id, 
            {firstName: req.body.firstName, lastName: req.body.lastName}, 
            (err, docs) => {
                if(err) {throw err};
                if(docs) {res.send(docs)};
            })
    }
});

router.put('/phone', (req, res) => {
    if(req.user){
        User.findByIdAndUpdate(req.user._id, 
            {phone: req.body.phone}, 
            (err, docs) => {
                if(err) {throw err};
                if(docs) {res.send(docs)};
            }
        )
    }
});

router.put('/address/add', (req, res) => {
    if(req.user){
        User.updateOne(
            {_id: req.user._id},
            { $push: {addresses: req.body.address}},
            (err, docs) => {
                if(err) {throw err};
                if(docs) {res.send(docs)};
            });
    }
});

router.put('/address/remove', (req, res) => {
    console.log(req.body.address);
    if(req.user){
        User.updateOne(
            {_id: req.user._id},
            { $pull: {addresses: req.body.address}},
            (err, docs) => {
                if(err) {throw err};
                if(docs) {res.send(docs)};
            });
    }
});

router.delete('/logout', (req, res) => {
    req.logOut();
    res.send('successfully logout')
})

module.exports = router;