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
}
