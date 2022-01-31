import { HospitalModel } from "../model/hospital.js";

import express from "express";

let routes = express.Router({})

routes.get('/:id', (req, res) => {
    HospitalModel.findById(req.params.id, (err, v) => {
        if (err) {
            res.json({ error: err })
        } else {
            res.send({ vaccine: v })
        }
    })
})

routes.get('/', (req, res) => {
    HospitalModel.find({}, (err, hs) => {
        if (err) {
            res.json({ error: err})
        } else {
            res.send({ hospitals: hs })
        }
    })
})

routes.put('/', (req, res) => {
    let newHospital = new HospitalModel(req.body)
    newHospital.save((err, h, next) => {
        if (err) {
            res.json({ error:  err })
        } else {
            res.send({ hospital: h })
        }
    })
})

routes.post('/', (req, res) => {
    HospitalModel.findByIdAndUpdate(req.body.hospital._id, { 
        ...req.body.hospital, 
        _id: undefined
    }, (err, h) => {
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ hospital: h })
        }
    })
})

export default routes