
const fs = require('fs');
const path = require('path');

// Read image file
const imagePath = path.join(__dirname, '../sampleImages/DSCF9648.jpeg');
const imageFile = fs.readFileSync(imagePath);


// Convert the image data to a Buffer and base64 encode it.
const encoded = Buffer.from(imageFile).toString('base64');

module.exports = encoded;
