
const User = require('../models/User');
const Landmark = require('../models/Landmark');

module.exports = {
  getUser: async (req, res) => {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  },

  getUserLandmarks: async (req, res) => {
    const landmarks = await Landmark.find({ userId: req.params.id });
    res.json(landmarks);
  },

  saveLandmark: async (req, res) => {
    const newLandmark = new Landmark({
      userId: "09876",
      listType: req.body.listType,
      landmarkData: req.body.landmarkData,
      image: req.body.image,
    });
    try {
      const savedLandmark = await newLandmark.save();
      res.json(savedLandmark);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

