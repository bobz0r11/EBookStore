const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('../config/DB');
var client = require('mongodb').MongoClient;
var fs = require('fs');
var Binary = require('mongodb').Binary;

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/getfile", (req, response) => {
  client.connect(url, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      let file_path = "C:/Users/bobo9/Desktop/CV - Bogdan Alexandru.pdf"
      var data = fs.readFileSync(file_path);
      var file = {
        name: "book1",
        date: new Date(Date.now()),
        file_data: "",
      };
      file.file_data = Binary(data);

      const db = client.db('EBookStore');
      var collection = db.collection('files');
      // collection.insert(file, function (err, result) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("SUCCESFULLY INSERTED DOCUMENT" + file.name);
      //   }
      // })

      // collection.findOne({ name: "book1" }).then(result => {
      //   console.log(result);
      // })

      collection.findOne({ name: "book1" }).then((file) => {
        console.log(file);
        console.log("STARTING WRITING FILE");
        fs.writeFile('CV - Bogdan Alexandru.pdf', file.file_data.buffer, function (err) {
          if (err) console.log("ERROR!")
          console.log('Sucessfully saved!');
          response.end(new Buffer(file.file_data.buffer, 'binary'));
        });
      });
    }
  })
});

client.connect(url, (err, client) => {

})

app.use(bodyParser.json());
app.use(cors());
app.use('/register', userRoutes);

app.listen(port, function () {
  console.log('Process started @ host ' + ip.address() + ' listening on ' + port);
});