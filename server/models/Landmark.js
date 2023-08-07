
const mongoose = require('mongoose');

const LandmarkSchema = new mongoose.Schema({
  userId: String,
  listType: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
  image: String,
});

LandmarkSchema.statics.getById = async function(id) {
  return await this.findById(id);
}

LandmarkSchema.statics.deleteById = async function(id) {
  return await this.findByIdAndDelete(id);
}

const Landmark = mongoose.model('Landmark', LandmarkSchema);

module.exports = Landmark;

