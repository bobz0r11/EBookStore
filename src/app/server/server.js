const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('../config/DB');

const app = express();
const port = process.env.PORT || 4000;

var ip = require('ip');
const userRoutes = require('./routes/user.routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected successfully') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(bodyParser.json());
app.use(cors());
app.use('/register', userRoutes);

//Gridfs STORAGE FOR FILES
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var mongoDriver = mongoose.mongo;
let gfs = Grid(config.DB, "files");

let storage = GridFsStorage({
  url: config.DB + "/files",
  gfs: gfs,

  filename: (req, file, cb) => {
    let date = Date.now();
    // The way you want to store your file in database
    cb(null, file.fieldname + '-' + date + '.');
  },

  // Additional Meta-data that you want to store
  metadata: function (req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: 'files' // Root collection name
});

let upload = multer({
  storage: storage
}).single('file');

// Route for file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, error_desc: null, file_uploaded: true });
  });
});

// Route for getting all the files
app.get('/files', (req, res) => {
  let filesData = [];
  let count = 0;
  gfs.collection('ctFiles'); // set the collection to look up into

  gfs.files.find({}).toArray((err, files) => {
    // Error checking
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    // Loop through all the files and fetch the necessary information
    files.forEach((file) => {
      filesData[count++] = {
        originalname: file.metadata.originalname,
        filename: file.filename,
        contentType: file.contentType
      }
    });
    res.json(filesData);
  });
});

app.listen(port, function () {
  console.log('Process started @ host ' + ip.address() + ' listening on ' + port);
});