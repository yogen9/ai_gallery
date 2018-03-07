//===================================================
var express = require("express"),
    bodyParser = require("body-parser"),
    mongo = require("mongoose"),
    fileUpload = require('express-fileupload'),
    methodOverride = require("method-override"),
    AWS = require('aws-sdk');

//=================================================
var app = express();
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
//===========================================
var s3 = new AWS.S3();
var rekognition = new AWS.Rekognition({
    region: "us-east-2"
});

//===================================================

mongo.connect("mongodb://localhost/aigallery");

//====================================================================

app.listen(4000, function () {
    console.log("Server started at 4000...");
});

app.get("/", (req, res) => {
    var params = {
        Bucket: "yogen1",
    };
    s3.listObjects(params, function (err, data) {
        if (err) { // an error occurred
            console.log(err, err.stack);
        } else {
            console.log(data);
            var keysObj = {
                keys: []
            }
            data.Contents.forEach(obj => {
                keysObj.keys.push(obj.Key);
            });
            console.log(keysObj);
            res.render("home", {
                keysObj: keysObj
            });
        }
    });
    
});

app.post("/", function (req, res) {
    var params = {
        Body: req.files.img.data,
        Key: req.files.img.name,
        Bucket: "yogen1",
        ServerSideEncryption: "AES256"
    };
    s3.putObject(params, (err, data) => {
        if (err)
            console.log(err, err.stack);
        else
            console.log(data);
        var par = {
            Image: {
                S3Object: {
                    Bucket: "yogen1",
                    Name: req.files.img.name
                }
            },
            MinConfidence: 70
        };
        rekognition.detectLabels(par, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
        });
    });


});