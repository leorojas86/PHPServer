//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
class S3 {
    constructor(config) {
      AWS.config.update({
        region: config.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: config.identityPoolId })
      });

      this.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: config.bucketName }
      });
    }

    addItem(itemKey, data) {
      return new Promise((resolve, reject) => {
        this.s3.upload({
          Key: itemKey,
          Body: data,
          ACL: 'public-read'
        }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

    getItem(itemKey) {
      return new Promise((resolve, reject) => {
        this.s3.getObject({Key: itemKey}, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
         });
      });
    }

    deleteItem(itemKey, data) {
      return new Promise((resolve, reject) => {
        s3.deleteObject({Key: itemKey}, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

}
