const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }   // HUOM: objektina
);

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // esim. "Golf"
    manufacturer: { type: String, required: true },  // esim. "Volkswagen"
    year: { type: Number, required: true },
    fuelType: { type: String },                      // Bensiini / Diesel / Sähkö
    horsepower: { type: Number },
    description: { type: String },
    imageUrl: { type: String },
    comments: [commentSchema]
  },
  { timestamps: true }   // tänne myös, jos haluat createdAt/updatedAt autolle
);

module.exports = mongoose.model('Car', carSchema);