const nodemailer = require('nodemailer')

module.exports = function createTransport() {
    return nodemailer.createTransport({
        service: 'gmail',
        secure: false, // AM - we will need this once SSL is turned on 
        port: 25,
        auth: {
            user: 'amarvick94@gmail.com',
            pass: process.env.emailPassword // AM - this works, but make fake password later
        },
        tls: {
            rejectUnauthorized: false
        }
    })
}