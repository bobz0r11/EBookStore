const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('../config/DB');
var client = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 4000;

var ip = require('ip');
const userRoutes = require('./routes/user.routes');
let url = "mongodb://localhost:27017";

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected successfully') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/getfile/:pdffile", (req, response) => {
  console.log("CONNECTED OTHER METHOD");
  client.connect(url, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      const fileName = req.url.split("/").slice(-1);
      const db = client.db('EBookStore');
      var collection = db.collection('files');
      console.log("IM HERE NOW");

      collection.findOne({ name: { $regex: ".*" + `${fileName}` + '.*' } }).then((pdfDoc) => {
        response.end(new Buffer(pdfDoc.file_data.buffer, 'binary'))
        // console.log(pdfDoc);
        // response.send(pdfDoc);
      });
    }
  })
});

app.get("/search/:bookname", (req, res) => {
  console.log("REQUEST HERE ------------------------- ");
  const bookname = req.url.split("/").slice(-1);
  console.log(bookname);

  client.connect(url), (err, client) => {
    if (err) {
      console.log("ERROR HERE");
      console.log(err);
    }

    console.log("RECEIVED REQUEST HERE /SEARCH/BOOKNAME");
    const db = client.db('EBookStore');
    var collection = db.collection('files');

    collection.findOne({ name: `${bookname}` }).then((pdfDoc) => {
      console.log(pdfDoc);
      res.send("IM OK");
    });

    console.log("connected to mongo here")

    console.log("FILENAME INSIDE /search NODE ROUTE");

    // res.end(new Buffer1);
  }
});

app.use(bodyParser.json());
app.use(cors());
app.use('/register', userRoutes);

app.listen(port, function () {
  console.log('Process started @ host ' + ip.address() + ' listening on ' + port);
});