const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.set('port', process.env.SERVER_PORT || 4000);

// Routes
// TODO

module.exports = app;
