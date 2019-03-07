const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
const router = express.Router()

const createTransport = require('./createTransport')

// New User Registration
function newUserRegistration(newUser) {
    let transporter = createTransport()

    // Email parameters (AM - make in to separate file?)
    let Message = {
        from: `NEW USER REGISTRATION <${newUser.email}>`,
        to: 'amarvick94@gmail.com',
        subject: `Registration request from ${newUser.name}`,
        html: `${newUser.name} needs employee registration. Please click here to verify.`
    }
    
    transporter.sendMail(Message, (error, info) => {
        if (error) {
            console.log(error)
            return error
        } else {
            console.log(info)
            return info
        }
    })  
}

// Sending in email via contact form
function sendEmailContactForm(letter) {
    let transporter = createTransport()

    // Email parameters 
    let Message = {
        from: `${letter.name} <${letter.email}>`,
        to: 'amarvick94@gmail.com',
        subject: `Inquiry from ${letter.name}: ${letter.subject}`,
        html: `${letter.message}`
    }
    
    transporter.sendMail(Message, (error, info) => {
        if (error) {
            console.log('Error in sending email. See details below...')
            console.log(error)
            res.send(error)
            throw error
        } else {
            console.log('Email successfully sent!')
            console.log(info)
            res.send(info)
            throw info
        }
    })     
}

function sendJobApplication(jobApp) {
    let transporter = createTransport()
    console.log(jobApp.resume)

    // Email parameters 
    let Message = {
        from: `${jobApp.name} <${jobApp.email}>`,
        to: 'amarvick94@gmail.com',
        subject: `${jobApp.jobTitle} Job Application - ${jobApp.name}`,
        html: `${jobApp.summary} ${jobApp.resume}`,
        attachments: [
            {
                filename: jobApp.resume,
                content: fs.createReadStream(jobApp.resume)
                // path: fs.createReadStream(req.body.resume)
            }
        ]
    }
    
    transporter.sendMail(Message, (error, info) => {
        if (error) {
            res.send(error)
            throw error
        }
        res.send(info)
        throw info
    })
}

function newTemporaryPassword(email, tempPassword) {
    let transporter = createTransport()

    // Email parameters 
    let Message = {
        from: `PASSWORD UPDATE REQUEST <amarvick94@gmail.com>`,
        to: 'amarvick94@gmail.com',
        subject: `Password Update Request`,
        html: `Hi, we see you've requested a password update. We've given you the temporary password: ${tempPassword}. Please log in to your account with this new password, click 'Change Password' and use it as your old password as you create a new one. If you have any further questions, please contact your advisor.`
    }
    
    transporter.sendMail(Message, (error, info) => {
        if (error) {
            res.send(error)
            throw error
        }
        res.send(info)
        throw info
    })
}

// Register (permissions granted to CEO/high admin)
exports.newUserRegistration = newUserRegistration
exports.sendEmailContactForm = sendEmailContactForm
exports.sendJobApplication = sendJobApplication
exports.newTemporaryPassword = newTemporaryPassword