const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require('../config/passport')(passport);

app.set('port', process.env.SERVER_PORT || 4000);

// Routes
const waiters = require('./routes/api/v1/waiters');
const menus = require('./routes/api/v1/menus');

app.use('/api/v1/waiters', waiters);
app.use('/api/v1/menus', passport.authenticate('jwt', { session: false }),
        menus);

module.exports = app;
