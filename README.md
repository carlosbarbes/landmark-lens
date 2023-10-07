# Landmark Lens - Mobile Landmark Identification App

Welcome to Landmark Lens, a mobile application designed to identify and catalog landmarks through image recognition. This README provides an overview of the project, its key features, the technologies used, and setup instructions.

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Google Vision API Configuration](#google-vision-api-configuration)
- [MongoDB Configuration](#mongodb-configuration)
- [Running the App](#running-the-app)

## Introduction

Landmark Lens is a mobile application that allows users to identify landmarks by either taking a new photo or selecting one from their device. The app leverages Google Vision API to recognize the landmark and provides an option to save it into a list.

## Technologies Used

### Client
- React Native: A JavaScript framework for building native mobile apps.
- Expo: A framework that provides a set of tools to bootstrap React Native projects.

### Server
- Node.js: JavaScript runtime for building scalable network applications.
- Express.js: A fast, unopinionated web framework for Node.js.
- MongoDB: A NoSQL database.
- Google Vision API: A machine learning tool for image analysis.

## Features
- Image Upload: Users can upload images to be analyzed for landmark identification.
- Landmark Detection: Utilizes Google Vision API to identify landmarks.
- Data Persistence: Saves recognized landmarks in a MongoDB database.
- Image Storage: Stores image files in a designated "uploads" directory, which should be manually created in the `server` folder before running the app.

## Getting Started

To set up the application on your local machine, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.

### Google Vision API Configuration

- Create a Google Cloud service account and obtain the JSON key file.
- Place the `.env` file in the `server` directory and update the `GOOGLE_APPLICATION_CREDENTIALS` with the path to your JSON key file.

### MongoDB Configuration

- Set up a MongoDB Atlas account and obtain your connection URI.
- Update the `MONGO_URI` in the `.env` file inside the `server` directory.

### Running the App

#### Server
1. Navigate to the `server` directory.
2. Create a directory named "uploads" for image storage.
3. Run `npm install` to install the server dependencies.
4. Run `node index.js` to start the server.

#### Client
1. Navigate to the `client` directory.
2. Run `npm install` to install client dependencies.
3. Use the Expo Go app on your mobile device or run `npx expo start` in your terminal.
4. Scan the QR code using your device's camera to launch the app.

## Contributors

- Carlos Bárcena Bescansa
  - [LinkedIn](https://www.linkedin.com/in/carlos-barcena-bescansa/)
  - [GitHub](https://github.com/carlosbarbes)
