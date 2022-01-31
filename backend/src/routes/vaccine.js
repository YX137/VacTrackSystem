import { VaccineModel } from "../model/vaccine.js";

import express from "express";

let routes = express.Router({})

routes.get('/:id', (req, res) => {
    VaccineModel.findById(req.params.id, (err, v) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.send({ vaccine: v })
        }
    })
})

routes.get('/', (req, res) => {
    VaccineModel.find({}, (err, vs) => {
        if (err) {
            res.json({ error: err})
        } else {
            res.send({ vaccines: vs })
        }
    })
})

routes.put('/', (req, res) => {
    let newVaccine = new VaccineModel(req.body)
    newVaccine.save((err, v, next) => {
        if (err) {
            res.json({ error:  err })
        } else {
            res.send({ vaccine: v })
        }
    })
})

routes.post('/', (req, res) => {
    VaccineModel.findByIdAndUpdate(req.body.vaccine._id, { 
        ...req.body.vaccine, 
        _id: undefined
    }, (err, v) => {
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ vaccine: v })
        }
    })
})

export default routes