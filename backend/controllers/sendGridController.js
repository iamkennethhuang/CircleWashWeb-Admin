if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
} // run the content when r are at dev stage

const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_K);

//
function sendSupportNotify(staffEmails){
    client.send({
        to: staffEmails,
        from: {
            email: "customercare@circlewash.net",
            name: "Circle Wash Customer Care"
        },
        subject: 'Support Notify',
        text: 'This is from Support Notification',
        html: "<h1>This is from Support Notification</h1>"
    })
    .then(() => {
        return true;
    })
    .catch( err => {
        console.log(err);
        return false;
    })
}

function sendApoligy(res){
    client.send({
        to: [{}],
        from: {
            email: "customercare@circlewash.net",
            name: "Circle Wash Customer Care"
        },
        subject: 'Sorry for Machine Malfunction',
        html: "<p>Dear circle wash customer, </p><p>Thank you so much for the pattence and understanding you have displayed. It is with great concern and regret we received your complain outling the problem you had with our service.</p>"
    })
    .then(() => {
        res.send('Sucessfully sent an email');
    })
    .catch( err => res.status(400).json('Error from sending Email: ' +  err));
}

function caseSend(req, res, next) {
    client.send({
        to: `${req.body.recipientEmail}`,
        from: {
            email: "customercare@circlewash.net",
            name: "Circle Wash Customer Care"
        },
        subject: 'Complaint Reply',
        html: `<p>${req.body.information}</p>`,
        text: `${req.body.information}`
    })
    .then(() => {
        next(req, res);
    })
    .catch( err => {
        console.log(err);
        res.send({message: 'from sendgrid', Error: err});
    });
}

module.exports = {
    sendSupportNotify,
    sendApoligy,
    caseSend
};
