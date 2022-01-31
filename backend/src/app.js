//create a node server application using npm cli, with below structure
//express and nodemon
//server.js
//router.js
//two end points one for default
//another with name - vaccination
//that will take inputs as query string - vaccine name, vaccine doses, gap (in number of days), price
//next call should have booster dose as another value and its price
//data should be saved in json file and in mongodb
//using mongoose

import express from "express";

import CORS from "cors";

//import { VaccinationRouter } from "./router.js"

import UserRoutes from "./routes/user.js"
import VaccineRoutes from "./routes/vaccine.js"
import HospitalRoutes from "./routes/hospital.js"
import VaccinationRoutes from "./routes/vaccination.js";

let app = express()

app.use(CORS())
app.use(express.json({
    limit: '2mb', 
    extended: false
}))
app.use(function (req, res, next) {
    next()
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} - ${res.statusCode}`)
})

app.get('/', (req, res) => res.send('Hello from vaccination tracker, if you see this, it means the system should be working just fine.'))
//app.use('/vaccination', VaccinationRouter)

app.use('/api/user', UserRoutes)
app.use('/api/vaccine', VaccineRoutes)
app.use('/api/hospital', HospitalRoutes)
app.use('/api/vaccination', VaccinationRoutes)

app.listen(8080)