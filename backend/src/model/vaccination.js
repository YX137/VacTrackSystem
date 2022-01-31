import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/vaccine?directConnection=true&serverSelectionTimeoutMS=2000")

let VaccinationSchema = new mongoose.Schema({
    user: { type: String, required: true },
    hospital: { type: String, required: true },
    vaccine: { type: String, required: true },
    appointment: { type: Date, required: true, default: () => new Date() },
    // Processing: the appointment is received but not scheduled yet, most of times this means unpaid
    // Scheduled: the appointment is ready and you can go to it at the scheduled time
    // Approved: the appointment is fulfilled
    status: { type: String, required: true, enum: [ 'processing', 'scheduled', 'approved' ], default: 'processing' }
})

export const VaccinationModel = mongoose.model('vaccination', VaccinationSchema)