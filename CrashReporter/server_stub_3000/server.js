var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var formidable = require('formidable');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/crashreporter', function(req, res) {
    console.log(" crashreporter =============== START");
    console.log(" Headers : ", req.headers);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log('****** Parsing formdata *****');
        console.log({
            fields: fields,
            files: files
        });
        console.log(" crashreporter =============== END");
    });
	
    res.end("DefaultResponse");
});


app.listen(3000, function() {
    console.log("Started on PORT 3000");
})