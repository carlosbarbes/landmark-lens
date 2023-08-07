
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static('uploads'));


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server using port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();

