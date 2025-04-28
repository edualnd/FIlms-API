import mongoose from "mongoose";
const filmSchema = new mongoose.Schema({
    imgUrl: {type: String},
    title: {type: String, unique: true, required: true},
    year: {type: Number, min: 1888},
    description: {type: String},
})

export default mongoose.model('filmModel', filmSchema)