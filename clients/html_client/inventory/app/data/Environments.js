class Environments {
  static get() {
    return {
      mock: {
        responseSec: 0.1
      },
      dev: {
        s3: {
          bucketName: 'inventory-db'
          bucketRegion: 'us-east-1',
          identityPoolId: 'us-east-1:5b88dd8b-b0d4-48a8-81bf-46189bb8877c'
        }
      },
      prod: {

      }
    };
  }
}
