//https://aws.amazon.com/sdk-for-node-js/

var AWS = require('aws-sdk');

var s3 = new AWS.S3();

console.log("s3 -> ", s3);

// Bucket names must be unique across all S3 users

var myBucket = 'aws-website-crnegocioscom-yxnfk';

s3.createBucket({Bucket: myBucket}, function(err, data) {

if (err) {

   console.log(err);

   } else {

     params = {Bucket: myBucket, Key: 'yxnfk', Body: 'Hello!'};

     s3.putObject(params, function(err, data) {

         if (err) {

             console.log(err)

         } else {

             console.log("Successfully uploaded data to myBucket/myKey");

         }

      });

   }

});
