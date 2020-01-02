const mongoose = require('mongoose');

const URI = process.env.DB_URL_PROD || process.env.DB_URL;

mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'Was an connection error to DB'));
mongo.on('open', () => console.log('The connection to the DB was successfully'));
