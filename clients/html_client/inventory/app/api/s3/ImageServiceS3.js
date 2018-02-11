class ImageServiceS3 {

  saveImage(id, imageData) {
    return S3.instance.saveItem(`image_${id}`, imageData, 'application/json')
  }

  getImage(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.images[id]), this.responseMiliSec);
    });
  }

}
