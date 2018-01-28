//https://aws.amazon.com/sdk-for-node-js/
//http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//https://stackoverflow.com/questions/21440709/how-do-i-get-aws-access-key-id-for-amazon

var AWS   = require('aws-sdk');
var async = require('async');
var fs    = require('fs');
var path  = require("path");
var s3    = new AWS.S3();

var BUCKET        = 'inventory-static';
var DEPLOY_FOLDER = path.resolve('./output');

/*function createBucketFolder(bucketFolder) {
  s3.createBucket({ Bucket: bucketFolder }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created bucket folder '" + bucketFolder + "'");
    }
  });
}*/
function getContentType(file)
{
  if (file.includes('.html')) return 'text/html';
  if (file.includes('.css'))  return 'text/css';
  if (file.includes('.js'))   return 'text/javascript';
  if (file.includes('.png'))  return 'image/png';
  return 'application/octet-stream';
}

function uploadFileToS3(file, fileSystemPath, bucketFolder)
{
  console.log('Uploading file -> ' + file);
  var params =
  {
    Bucket: bucketFolder,
    Key: file,
    Body: fs.readFileSync(fileSystemPath),
    ContentType: getContentType(file),
  };
  s3.putObject(params, function(err, data)
  {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded '" + file + "' data to S3");
  });
}

function uploadFolder(fileSystemFolder, bucketFolder)
{
  //createBucketFolder(bucketFolder);
  var files = fs.readdirSync(fileSystemFolder);
  async.map(files, function (file, cb)
  {
    var fileSystemPath = path.join(fileSystemFolder, file);
    if(fs.lstatSync(fileSystemPath).isFile())
      uploadFileToS3(file, fileSystemPath, bucketFolder);
    else
      uploadFolder(fileSystemPath, bucketFolder + "/" + file);
  }, function (err, results)
  {
    if (err) console.error(err);
    console.log(results);
  });
}

uploadFolder(DEPLOY_FOLDER, BUCKET);
