const router = require('express').Router();
let User = require('../models/user');
let PendingStaff = require('../models/pendingStaff');
let Staff = require('../models/staff');
const bcrypt = require('bcrypt');
const axios = require('axios');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

router.post('/', (req, res) => {
    User.findOne({email: req.body.email}, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.send('Email is taken')};
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            await newUser.save();
            res.send(true);
        }
    });
});

router.post('/staff/manually', (req, res) => {
    Staff.findOne({email: req.body.email}, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.send('Email is taken')};
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const encryptPassword = await cryptr.encrypt(req.body.password);
            const newStaff = new Staff({
                email: req.body.email,
                password: hashedPassword,
                encryptPassword: encryptPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role
            });
            await newStaff.save();
            res.send(true);
        }
    });
});

router.post('/staff/pending', (req, res) => {
    axios({
        method: 'post',
        data: {
            UserName: req.body.email,
            Password: req.body.password
        },
        url: 'https://m.fascard.com/api/AuthToken/',
    })
    .then((authRes) => {
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${authRes.data.Token}` },
            url: 'https://m.fascard.com/api/Account/',
        })
        .then((accountRes) => {
            let record = false;
            let index = -1;
            for(let i = 0; i < accountRes.data.length; i++){
                record = record || accountRes.data[i].Employee;
                if(accountRes.data[i].Employee && (accountRes.data[i].Name === "Circle Wash")){
                    index = i;
                }
            }
            if (record){
                if(index > -1){
                    Staff.findOne({email: req.body.email}, async (err, doc) => {
                        if (err) throw err;
                        if (doc) {
                            res.send({message: 'Email is taken'})};
                        if(!doc){
                            const hashedPassword = await bcrypt.hash(req.body.password, 10);
                            const encryptPassword = await cryptr.encrypt(req.body.password);
                            const newStaff = new Staff({
                                email: req.body.email,
                                password: hashedPassword,
                                encryptPassword: encryptPassword,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                role: 'support',
                                perms: []
                            });
                            await newStaff.save();
                            res.send({status: true, message: "Succefully register staff account"});
                        }
                    });
                }
                else{
                    PendingStaff.findOne({email: req.body.email}, async (err, doc) => {
                        if (err) throw err;
                        if (doc) {
                            res.send({status: false, message: "This employee account is registered previously"})};
                        if(!doc){
                            const hashedPassword = await bcrypt.hash(req.body.password, 10);
                            const encryptPassword = await cryptr.encrypt(req.body.password);
                            const newPendingStaff = new PendingStaff({
                                email: req.body.email,
                                password: hashedPassword,
                                encryptPassword: encryptPassword,
                                status: true,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName
                            });
                            await newPendingStaff.save();
                            res.send({status: true, message: "Succefully added email address into pending list"});
                        }
                    });
                }
            }
            else{
                res.status(403).send({message: "This is not an FasCard Employee Account"});
            }
        })
        .catch((accountError) => {
            res.status(401).send({message: "Please check the token", error: accountError});
        })
    })
    .catch((authError) => {
        res.status(403).send({message: "This acount does not exist or incorrect password", error: authError});
    })
})

module.exports = router;