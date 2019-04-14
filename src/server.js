const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB'),
  os = require('os');

var ip = require('ip')
const userRoutes = require('./routes/user.routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected successfully') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/register', userRoutes);
const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log('Process started @ host ' + ip.address()  + ' listening on ' + port);
});