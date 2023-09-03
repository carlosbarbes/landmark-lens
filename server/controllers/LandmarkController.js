
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
const {GoogleAuth} = require('google-auth-library');
const path = require('path');
const Landmark = require('../models/Landmark');


module.exports = {
  detect: async (req, res) => {
    try {
      // Create a new JWT client using the key file downloaded from the Google Cloud Console
      const auth = new GoogleAuth({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });

      const client = await auth.getClient();
      const accessToken = (await client.getAccessToken()).token;

      // Read the image file and convert it to base64
      const imageFile = fs.readFileSync(req.file.path);
      const encodedImage = Buffer.from(imageFile).toString('base64');

      // Delete the image file after read
      fs.unlinkSync(req.file.path);

      const requestBody = {
        requests: [
          {
            image: {
              content: encodedImage,
            },
            features: [
              {
                maxResults: 10,
                type: "LANDMARK_DETECTION",
              },
            ]
          }
        ]
      };

      // Send the request to the Google Vision API
      const visionResponse = await axios.post('https://vision.googleapis.com/v1/images:annotate', requestBody, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });

      // Extract the relevant data from the response
      const landmarks = visionResponse.data.responses[0].landmarkAnnotations || [];
      console.log('Landmarks:', landmarks);

      if (landmarks.length === 0) {
        return res.status(404).json({ message: "No landmarks found" });
      }

      // Create a new landmark object
      const landmark = {
        description: landmarks[0].description,
        location: landmarks[0].locations[0].latLng,
      };

      // Sends the landmarks data only
      return res.status(200).json({ landmark });

    } catch (err) {
      console.error('ERROR:', err);
      res.status(500).send();
    }
  },

  saveLandmark: async (req, res) => {
    try {
      const landmarkData = JSON.parse(req.body.landmark);
      const imageFile = req.file;

      const landmark = new Landmark({
        userId: req.body.userId,
        listType: req.body.listType,
        description: landmarkData.description,
        location: landmarkData.location,
        image: path.join('uploads', imageFile.filename)
      });

      console.log(landmark);

      await landmark.save();

      res.status(200).json({ message: 'Landmark saved successfully' });
    } catch (err) {
      console.error('ERROR:', err);
      res.status(500).send();
    }
  },

  deleteLandmark: async (req, res) => {
    try {
      const landmarkId = req.params.id;

      // 1. Fetching the landmark from the database using its ID.
      const landmark = await Landmark.getById(landmarkId);
      if (!landmark) {
        return res.status(404).json({ error: 'Landmark not found' });
      } else {console.log(landmarkId);};

      // 2. Getting the image file name/path from the retrieved landmark data.
      const imagePath = path.join(__dirname, '..', landmark.image); // adjust the path.join arguments if your folder structure is different

      // Check if the file exists
      if (fs.existsSync(imagePath)) {
        // Deleting the image using the correct path.
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`File ${imagePath} not found, but continuing with landmark deletion.`);
      }

      // Deleting the landmark data from the DB.
      await Landmark.deleteById(landmarkId);

      res.status(200).json({ message: 'Landmark and associated image deleted successfully' });
    } catch (err) {
      console.error('ERROR:', err);
      res.status(500).send();
    }
  }
};