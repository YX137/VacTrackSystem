import { UserModel } from "../model/user.js";
import { VaccinationModel } from "../model/vaccination.js";

import express from "express";

let routes = express.Router({})

// Get info of all users.
routes.get('/', (req, res) => {
    UserModel.find({}, (err, us) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.send({ users: us })
        }
    })
})

// Get basic info of a given user.
routes.get('/:id', (req, res) => {
    UserModel.findById(req.params.id, (err, u) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.send({ user: u })
        }
    })
})

// Get vaccination records of a given user.
routes.get('/:id/vaccination', (req, res) => {
    VaccinationModel.find({ user: req.params.id }, (err, vs) => {
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ vaccinations: vs })
        }
    })
})

// This is the route for login user.
// In the future this should also returns a session token or something.
routes.post('/', (req, res) => {
    UserModel.findOne({ name: req.body.userName }, (err, u) => {
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ user: u })
        }
    })
})

// Route for registration.
routes.put('/', (req, res) => {
    console.log('/api/user/ is hit')
    let newUser = new UserModel({ ...req.body, admin: false })
    newUser.save((err, u, next) => {
        if (err) {
            res.json({ error:  err })
        } else {
            res.send({ user: u })
        }
    })
})

routes.put('/:id/vaccination', (req, res) => {
    let newAppointment = new VaccinationModel({ ...req.body, user: req.params.id })
    newAppointment.save((err, app, next) => {
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ vaccination: app })
        }
    })
})

export default routes