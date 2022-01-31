import { VaccinationModel } from "../model/vaccination.js";

import express from "express";

let routes = express.Router({})

routes.get('/', (req, res) => {
    VaccinationModel.find({}, (err, vs) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.send({ vaccinations: vs })
        }
    })
})

routes.get('/:id', (req, res) => {
    VaccinationModel.findById(req.params.id, (err, v) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.send({ vaccination: v })
        }
    })
})

routes.put('/', (req, res) => {
    let newVaccination = new VaccinationModel(req.body)
    newVaccination.save((err, v, next) => {
        if (err) {
            res.json({ error:  err })
        } else {
            res.send({ vaccination: v })
        }
    })
})

// https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model
// Explicitly declare to return the updated document to avoid relying on default value
routes.post('/', (req, res) => {
    VaccinationModel.findByIdAndUpdate(req.body.vaccination._id, { 
        ...req.body.vaccination, 
        _id: undefined
    }, { new: true }, (err, v) => {
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ vaccination: v })
        }
    })
})

export default routes