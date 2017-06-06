'use strict';
const nodemailer = require('nodemailer');
const config = require('../config.js')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: config.SMTP_URL,
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.EMAIL_ADDR,
        pass: config.EMAIL_PASS
    }
});

var send = (opts, callback) => {
    // setup email data with unicode symbols
    let mailOptions = {
        // from: '"Fred Foo" <foo@blurdybloop.com>', // sender address
        // to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        // subject: 'Hello ✔', // Subject line
        // text: 'Hello world ?', // plain text body
        // html: '<b>Hello world ?</b>' // html body
        from : opts.from || '"Patrice PETIT" <petitpatrice@gmail.com>',
        to : opts.to || 'patricepetit@hotmail.com',
        subject : opts.subject || 'You have a new comment',
        text : opts.txt || 'Hello world ?',
        html : '<b>Hello world ?</b>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return callback();
    });

}

module.exports = {
    send
}
