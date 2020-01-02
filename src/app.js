const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require('../config/passport')(passport);

app.set('port', process.env.PORT || 4000);

// Routes
const waiters = require('./routes/api/v1/waiters');
const menus = require('./routes/api/v1/menus');
const items = require('./routes/api/v1/items');
const orders = require('./routes/api/v1/orders');

app.use('/api/v1/waiters', waiters);
app.use('/api/v1/menus', passport.authenticate('jwt', { session: false }),
        menus);
app.use('/api/v1/items', passport.authenticate('jwt', { session: false }),
        items);
app.use('/api/v1/orders', passport.authenticate('jwt', { session: false }),
        orders);

module.exports = app;
