import express from "express"
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/vaccine?directConnection=true&serverSelectionTimeoutMS=2000")

let VaccineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, default: 0, min: [ 0, 'Price cannot go below 0 (0 means free of charge)' ] },
    origin: { type: String, default: "COVAX" },
    sideEffects: { type: String, default: 'Unknown' },
    doses: { type: Number, required: true, default: 1, min: [ 1, 'Dose must be >= 1' ] },
    remark: String
})

export const VaccineModel = mongoose.model('vaccine', VaccineSchema)