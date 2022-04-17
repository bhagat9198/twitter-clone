const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const controller = require('./controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.get('/recent', controller.getRecent);
app.get('/query/:query', controller.getQuery);


app.listen(PORT, () => {
  console.log('Connected At PORT :: ', PORT);
})