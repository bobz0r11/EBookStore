const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const fs = require('fs');
const Binary = require('mongodb').Binary;

function insertData(filePath) {
    client.connect(url, (err, client) => {
        if (err) {
            console.log(err);
        } else {
            var data = fs.readFileSync(filePath);
            var pdfFile = {
                name: filePath.split("/").slice(-1).toLocaleString().replace(".pdf", ""),
                date: new Date(Date.now()),
                file_data: "",
            };
            pdfFile.file_data = Binary(data);

            const db = client.db('EBookStore');
            var collection = db.collection('files');
            collection.insert(pdfFile, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("SUCCESFULLY INSERTED DOCUMENT: " + pdfFile.name);
                }
            })
        }
    })
}

var appRoot = require('app-root-path').path;
var pdfPath = appRoot + "/insert_pdfs";

insertData(pdfPath + "/200-6_Book.pdf");
insertData(pdfPath + "/AdvancedJava200711.pdf");
insertData(pdfPath + "/Become_a_ninja_with_Angular2_sample.pdf");
insertData(pdfPath + "/Effective-Java-2nd-Edition.pdf");
insertData(pdfPath + "/Eloquent_JavaScript.pdf");
insertData(pdfPath + "/Java_Design_Pattern_eBook.pdf");
insertData(pdfPath + "/kupdf.net_angular2pdf.pdf");
insertData(pdfPath + "/MEAN, MongoDB Express AngularJS and Node.js.pdf");
insertData(pdfPath + "/mongodb.pdf");
insertData(pdfPath + "/Spring in Action, 4th Edition.pdf");
insertData(pdfPath + "/TypeScriptNotesForProfessionals.pdf");
insertData(pdfPath + "/Web_Development_with_Node_Express.pdf");

