var nodemailer = require('nodemailer');

var mail = {
    from: {
        host: "smtp.163.com",
        port: 465,
        secure: true,
        auth: {
            user: 'sh1304354608@163.com',
            pass: 'shenhao19910619'
        }
    },
    to: "bevis.shen@suryani.cn"
};

var smtpTransport = nodemailer.createTransport('SMTP', mail.from);

function sendMail(subject, html) {
    var mailOptions = {
        from: mail.from.auth.user,
        to: mail.to,
        subject: subject,
        html: html
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
    });
};

sendMail('Hello', '<p>Hello Bevis!</p>');
