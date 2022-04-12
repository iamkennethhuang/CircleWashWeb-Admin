const router = require('express').Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);
const machCode = [ 44021, 44022, 44023, 44024, 44025, 44026, 44027, 44028, 44029, 
    44033, 44036, 44037, 44040, 44061, 44062, 44063, 44064, 44065, 44066, 44067, 
    44068, 44069, 44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 
    44079, 44080, 44081, 44082, 44083, 44091, 44092, 44093, 44094, 44095, 44096,
    44097, 44098, 44099, 44100, 44101, 44102, 44103, 44104, 44105, 44106, 44107, 
    44108, 44109, 44110, 44111, 44112, 44113, 44114, 44115, 44116, 44117, 44118, 
    44119, 44120, 44121, 44122, 44123, 44124];
const axios = require('axios');
const apiOption = {year: 'numeric', month: 'numeric', day: 'numeric'};
const apiOptionMonth = {year: 'numeric', month: 'numeric'};
const {pieChartAnalyze, findAllError, lineChartAnalyze} = require('../services/analyze');

function filterShit(data, target) {
    for(let i = (data.length - 1); i > -1; i--){
        const machDate = new Date(data[i].StatusTime).toLocaleDateString("en-US", apiOptionMonth);
        if (machDate !== target) {data.pop();}
        else{ break; }
    }
    return data;
}

router.get('/mach/history', (req, res) => {
    axios({
        method: 'post',
        url: "https://m.fascard.com/api/AuthToken",
        data:{
            'UserName': req.user.email,
            "Password": cryptr.decrypt(req.user.encryptPassword)
        }
    })
    .then((authRes) => {
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${authRes.data.Token}` },
            url: `https://m.fascard.com/api/Machine/${machCode[req.query.machNo - 1]}/History`,
        })
        .then((machRes) => {
            const machHistOfOneDay = machRes.data.filter(hist => {
                const machDate = new Date(hist.StatusTime).toLocaleDateString("en-US", apiOption);
                const sampleDate = new Date(req.query.date).toLocaleDateString("en-US", apiOption);
                if (machDate === sampleDate) {
                    return true;
                }
                else{
                    return false;
                }
            })
            res.send(machHistOfOneDay);
        })
        .catch((machErr) => {
            res.status(903).send(machErr);
        })
    })
    .catch((authErr) => {
        res.status(401).send(authErr);
    })
});

router.get('/pie', (req, res) => {
    axios({
        method: 'post',
        url: "https://m.fascard.com/api/AuthToken",
        data:{
            'UserName': req.user.email,
            "Password": cryptr.decrypt(req.user.encryptPassword)
        }
    })
    .then((authRes) => {
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${authRes.data.Token}` },
            url: `https://m.fascard.com/api/Machine/${machCode[req.query.machNo - 1]}/History`,
        })
        .then((machRes) => {
            const machHistOfOneDay = machRes.data.filter(hist => {
                const machDate = new Date(hist.StatusTime).toLocaleDateString("en-US", apiOption);
                const sampleDate = new Date(req.query.date).toLocaleDateString("en-US", apiOption);
                if (machDate === sampleDate) {
                    return true;
                }
                else{
                    return false;
                }
            })
            const analyzeData = pieChartAnalyze (machHistOfOneDay);
            if(analyzeData){
                res.send(analyzeData);
            }
            else{
                res.status(500).send({message: 'None of the data matches'})
            }
        })
        .catch((machErr) => {
            res.status(903).send(machErr);
        })
    })
    .catch((authErr) => {
        res.status(401).send(authErr);
    })
});

router.get('/pie/month/all', async (req, res) => {
    let allPieDate = [];
    let token = null;
    await axios({
        method: 'post',
        url: "https://m.fascard.com/api/AuthToken",
        data:{
            'UserName': req.user.email,
            "Password": cryptr.decrypt(req.user.encryptPassword)
        }
    })
    .then(async (authRes) => {
        token = authRes.data.Token
        for(let i = 0; i < machCode.length; i++){
            await axios({
                method: 'get',
                headers: { Authorization: `Bearer ${token}` },
                url: `https://m.fascard.com/api/Machine/${machCode[i]}/History?Limit=1000`,
            })
            .then((machRes) => {
                const sampleDate = new Date().toLocaleDateString("en-US", apiOptionMonth);
                const dataOfTheMonth = filterShit(machRes.data, sampleDate);
                const analyzeData = pieChartAnalyze (dataOfTheMonth);
                if(analyzeData){
                    const machineData = {
                        machineNumber: (i + 1),
                        pieData: analyzeData
                    }
                    console.log(i);
                    allPieDate.push(machineData);
                }
            })
            .catch((machErr) => {
                res.status(903).send(machErr);
            })
        }
        console.log("finish");
        res.send(allPieDate);
    })
    .catch((authErr) => {
        res.status(401).send(authErr);
    })
    
});

router.get('/all/error', (req, res) => {
    axios({
        method: 'post',
        url: "https://m.fascard.com/api/AuthToken",
        data:{
            'UserName': req.user.email,
            "Password": cryptr.decrypt(req.user.encryptPassword)
        }
    })
    .then((authRes) => {
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${authRes.data.Token}` },
            url: `https://m.fascard.com/api/Machine/${machCode[req.query.machNo - 1]}/History?Limit=1000`,
        })
        .then((machRes) => {
            const machHistOfOneDay = machRes.data.filter(hist => {
                const machDate = new Date(hist.StatusTime).toLocaleDateString("en-US", apiOption);
                const sampleDate = new Date(req.query.date).toLocaleDateString("en-US", apiOption);
                if (machDate === sampleDate) {
                    return true;
                }
                else{
                    return false;
                }
            })
            const allError = findAllError(machHistOfOneDay);
            res.send(allError);
        })
        .catch((machErr) => {
            res.status(903).send(machErr);
        })
    })
    .catch((authErr) => {
        res.status(401).send(authErr);
    })
});

router.get('/line', (req, res) => {
    axios({
        method: 'post',
        url: "https://m.fascard.com/api/AuthToken",
        data:{
            'UserName': req.user.email,
            "Password": cryptr.decrypt(req.user.encryptPassword)
        }
    })
    .then((authRes) => {
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${authRes.data.Token}` },
            url: `https://m.fascard.com/api/Machine/${machCode[req.query.machNo - 1]}/History`,
        })
        .then((machRes) => {
            const machHistOfOneDay = machRes.data.filter(hist => {
                const machDate = new Date(hist.StatusTime).toLocaleDateString("en-US", apiOption);
                const sampleDate = new Date(req.query.date).toLocaleDateString("en-US", apiOption);
                if (machDate === sampleDate) {
                    return true;
                }
                else{
                    return false;
                }
            })
            const dataPoints = lineChartAnalyze(machHistOfOneDay);
            res.json(dataPoints);
        })
        .catch((machErr) => {  
            res.status(903).send(machErr);
        })
    })
    .catch((authErr) => {
        res.status(401).send(authErr);
    })
});

module.exports = router;