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

let db;
let collection;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log("Connected MONGOOSE succesfullly") },
  err => { console.log("Can not connect mongoose to the database " + err) }
);

client.connect(config.DB, { useNewUrlParser: true, poolSize: 10 }).then(client => {
  db = client.db("EBookStore");
  collection = db.collection('files');
},
  () => { console.log('Database is connected successfully') },
  err => { console.log('Can not connect to the database ' + err) }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/getfile/:pdffile", (req, response) => {
  client.connect(url, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      const fileName = req.url.split("/").slice(-1);
      const db = client.db('EBookStore');
      var collection = db.collection('files');

      collection.findOne({ name: { $regex: ".*" + `${fileName}` + '.*' } }).then((pdfDoc) => {
        response.end(new Buffer(pdfDoc.file_data.buffer, 'binary'));
        // console.log(pdfDoc);
        // response.send(pdfDoc);
      });
    }
  })
});

app.get("/books/:name", (req, response) => {
  const bookname = req.url.split("/").slice(-1);
  collection.findOne({ name: { $regex: ".*" + `${bookname}` + '.*' } }).then((pdfDoc) => {
    if (pdfDoc) {
      response.send(pdfDoc);
    }
  });
});

app.use(bodyParser.json());
app.use(cors());
app.use('/register', userRoutes);

app.listen(port, function () {
  console.log('Process started @ host ' + ip.address() + ' listening on ' + port);
});