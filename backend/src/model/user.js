import express from "express"
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/vaccine?directConnection=true&serverSelectionTimeoutMS=2000")

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: Boolean, default: false },
    sex: { type: String, required: true, enum: [ 'male', 'female', 'other' ] },
    age: { type: Number, min: [ 0, 'Age cannot go below 0' ] },
    address: { type: String, required: true },
    contact: { type: String },
    profession: { type: String },
    medicalHistory: { type: String, default: 'None' }
})

export const UserModel = mongoose.model('user', UserSchema)