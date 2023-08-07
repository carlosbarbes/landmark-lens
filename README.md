# Landmark Lens - Solo-project. Codeworks

Landmark Lens is a mobile app designed to recognize and catalog landmarks. Users can take photos or select images from their camera roll. The app then uses the Google Vision API to identify the landmark and provide relevant information.

## Features

- Detect landmarks from images in the user's camera roll.
- Save identified landmarks in two lists stored in the database.
- View full-size images of saved landmarks.
- Delete landmarks from the saved lists.

## Tech Stack

The app is built with React Native using Expo, allowing it to run on both iOS and Android platforms. Google Vision API is in charge of detecting the landmarks. The backend utilizes Express running on Node.js, paired with MongoDB for the database and Mongoose for data modeling and management. 

## Reflections and Future Directions

My experience with React Native was bittersweet, while its cross-platform capabilities for iOS and Android are commendable, it has its share of challenges like frequent errors and deprecated packages.

However, working with Google Vision API was a fascinating experience. It opens a door into the vast world of Google Cloud, with countless functionalities that could be used to improve and expand Landmark Lens. In the future, we envision adding maps to the landmarks, using location data from Google Vision to translate into addresses, and leveraging machine learning for comparing images, thus increasing the landmark recognition accuracy. The possibilities are endless and thrilling!
