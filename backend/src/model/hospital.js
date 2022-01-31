import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/vaccine?directConnection=true&serverSelectionTimeoutMS=2000")

let HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: [ 'public', 'private' ] },
    address: { type: String, required: true },
    charges: Number
})

export const HospitalModel = mongoose.model('hospital', HospitalSchema)