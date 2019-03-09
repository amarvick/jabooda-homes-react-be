const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const router = express.Router()
const passport = require('passport')

// Getting models
const Careers = require('./models/careersdb')
const Projects = require('./models/projectsdb')
const Staff = require('./models/staffdb')
const Users = require ('./models/usersdb')

const users = require('./routes/api/users')

// Email related functions
const sendEmailContactForm = require('./email/actions/emailForwarding').sendEmailContactForm
const sendJobApplication = require('./email/actions/emailForwarding').sendJobApplication

const PORT = 3001

app.use(express.static(__dirname + '/public'))
app.use(cors())
app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
})

// Setting up MongoDB Database
const dbRoute = require('./config/keys').mongoURI

// Connect back end code with DB
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
)

// Connect to DB
let db = mongoose.connection
db.once("open", () => console.log('Connected to the Database'))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Check if error in connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

// Body Parser stuff
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/api', router)
app.use('/api/users', users)

// What's rendered on the browser
app.get('', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// ------------------------------- Get data from MongoDB -------------------------------
var retrieveData = function(db, req, res) {
    db.find((err, data) => {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err })
        }

        return res.json({ success: true, data: data })
    })
}

// Get Careers
router.get('/getCareerData', (req, res) => {
    console.log(req)
    console.log('***************************************************************************************************************************************')
    console.log(res)
    var data = res.json({
            success: true,
            data: {
                "_id": {
                    "$oid": "5c200d53e7179a74879741fb"
                },
                "jobtitle": "FRAMER",
                "description": "",
                "requirements": [
                    "Measure, cut and assemble lumber with precision",
                    "Be able to lift and carry heavy framing lumber, sheets of plywood and other materials",
                    "Strong analytical and mathematical skills",
                    "Don't be a noob",
                    "Be really good at what you do",
                    "asdf"
                ],
                "updatedAt": {
                    "$date": "2019-02-06T22:04:42.721Z"
                }
            }
    })
    // return retrieveData(Careers, req, res)
})

// Get Projects
router.get('/getProjectData', (req, res) => {
    return retrieveData(Projects, req, res)
})

// Get Staff
router.get('/getStaffData', (req, res) => {
    return retrieveData(Staff, req, res)
})

// Get Users
router.get('/getUserData', (req, res) => {
    return retrieveData(User, req, res)
})

// ------------------------------- Updating content -------------------------------
var updateData = function(db, req, res) {
    const update = req.body
    var id

    if (update.id !== null && update.id !== undefined) {
        id = update.id
    } else if (update._id !== null && update._id !== undefined) {
        id = update._id
    }
    
    db.findByIdAndUpdate(id, update, err => {
        console.log('id: ' + id)
        if (err) { 
            console.log(err)
            return res.json({ success: false, error: err })
        }
        console.log(update)
        return res.json({ update })
    })
}

// Updating Careers
router.post("/updateCareerData", (req, res) => {
    return updateData(Careers, req, res)
})

// Updating Projects
router.post("/updateProjectData", (req, res) => {
    return updateData(Projects, req, res)
})

// Updating Staff
router.post("/updateStaffData", (req, res) => {
    return updateData(Staff, req, res)
})

// Updating User
router.post("/updateUserData", (req, res) => {
    console.log(req.body)
    return updateData(Users, req, res)
})

// ------------------------------- Deleting content -------------------------------

var deleteData = function(db, req, res) {
    var id = Object.keys(req.body)[0] // AM - better solution. You pass in object in to here
    db.findByIdAndDelete(id, err => {
        if (err) return res.send(err)
        return res.json({ id })
    })
}
  
// Deleting Careers
router.post("/deleteCareerData", (req, res) => {
    return deleteData(Careers, req, res)
})

// Deleting Projects
router.post("/deleteProjectData", (req, res) => {
    return deleteData(Projects, req, res)
})

// Deleting Staff
router.post("/deleteStaffData", (req, res) => {
    return deleteData(Staff, req, res)
})

// Deleting User
router.post("/deleteUserData", (req, res) => {
    return deleteData(User, req, res)
})

// ------------------------------- Creating content -------------------------------

var createData = function(db, req, res) {
    const newData = req.body
    db.create(newData, err => {
        if (err) return res.send(err)
        return res.json({ newData })
    })
}

// Creating Careers
router.post("/createCareerData", (req, res) => {
    return createData(Careers, req, res)
})

// Creating Projects
router.post("/createProjectData", (req, res) => {
    return createData(Projects, req, res)
})

// Creating Staff
router.post("/createStaffData", (req, res) => {
    return createData(Staff, req, res)
})

// Creating User
router.post("/createUserData", (req, res) => {
    return createData(User, req, res)
})

// ------------------------------- Sending Emails -------------------------------

// AM - not working right now

// User sends an email via the 'Contact Us' page
app.post('/api/sendEmailform', (req, res) => {
    console.log('Sending...')
    res.send(sendEmailContactForm(req))
})

// User submits a job application
app.post('/api/submitApplication', (req, res) => {
    res.send(sendJobApplication(req))
})