
const axios = require('axios');
const fs = require('fs');
const {google} = require('googleapis');
const encoded = require('./ConvBase64.js')

const {GoogleAuth} = require('google-auth-library');

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

      console.log('Access token:', accessToken);

      // Set up the request body
      const requestBody = {
        requests: [
          {
            image: {
              content: encoded
            },
            features: [
              {
                maxResults: 10,
                type: "LANDMARK_DETECTION"
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
      const landmarks = visionResponse.data.responses[0].landmarkAnnotations;
      console.log('Landmarks:', landmarks);

      // Send the landmark data in the response
      res.send({ landmarks });

    } catch (err) {
      console.error('ERROR:', err);
      res.status(500).send({ error: err });
    }
  },
};
