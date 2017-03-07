//https://aws.amazon.com/sdk-for-node-js/

var AWS    = require('aws-sdk');
var async = require('async');
var fs    = require('fs');
var path  = require("path");
var s3    = new AWS.S3();

var BUCKET        = 'aws-website-crnegocioscom-yxnfk';
var DEPLOY_FOLDER = path.resolve('./deploy');

function createBucket(bucketFolder) {
  s3.createBucket({ Bucket: bucketFolder }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created bucket folder " + bucketFolder); 
    }
  });
}

function uploadFileToS3(file, filePath) {
  console.log('Uploading file -> ' + file);
  var params = { Bucket: BUCKET, Key: file, Body: fs.readFileSync(filePath) };
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully uploaded '" + file + "' data to S3");
    }
  });
}

function uploadFolder(folder) {
  var files = fs.readdirSync(folder);
  async.map(files, function (file, cb) {
    var filePath = path.join(folder, file);
    if(fs.lstatSync(filePath).isFile()) {
      uploadFileToS3(file, filePath);
    }
    else {
      createBucket(BUCKET + '/' + file);
    }
  }, function (err, results) {
    if (err) console.error(err);
    console.log(results);
  });
}

createBucket(BUCKET);
uploadFolder(DEPLOY_FOLDER);
