const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const bodyParser = require('body-parser');
const controller = require('./controller');

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.get('/query', controller.getQuery);
app.get('/user/:userId', controller.getUser);

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
  app.listen(PORT);
}).then(() => {
  console.log('Connected At PORT :: ', PORT);
}).catch(error => {
  console.log(error);
})
