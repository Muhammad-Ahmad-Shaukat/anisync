import mongoose from "mongoose";

const animeschema = new mongoose.Schema({
    animename: { type: String, required : true, unique: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    episodes: { type: Number, required: true },
    popularity: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String},
    trailer: { type: String, required: true },
    status: { type: String, required: true },
    season: { type: String, required: true },
    source: { type: String, required: true },
    character: { type: String, required: true },  
}, { timestamps: true });