var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.urlencoded({
    extended: false
}));

function getDownloadFolder() {
    var downloadFolderName = "Downloads";
    if ("HOME" in process.env) {
        return path.join(process.env.HOME, downloadFolderName);
    } else if ("HOMEPATH" in process.env) {
        return path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, downloadFolderName);
    } else if ("USERPROFILE" in process.env) {
        return path.join(process.env.USERPROFILE, downloadFolderName);
    }
};

app.post('/crashreporter', function(req, res) {
    console.log(" crashreporter =============== START");
    // console.log(" Headers : ", req);
    var form = new formidable.IncomingForm();
    form.uploadDir = getDownloadFolder();
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        console.log('****** Parsing formdata *****');
        console.log({
            fields: fields,
            files: files
        });

        console.log(" crashreporter =============== END");
        res.end(files.upload_file_minidump.name || "DefaultResponse");
    });
});


app.listen(3000, function() {
    console.log("Started on PORT 3000");
})