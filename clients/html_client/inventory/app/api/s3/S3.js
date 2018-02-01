class S3 {
    constructor() {
      this.s3 = null;
    }

    initialize(albumBucketName, bucketRegion, IdentityPoolId) {
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: IdentityPoolId })
      });

      this.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: albumBucketName }
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
