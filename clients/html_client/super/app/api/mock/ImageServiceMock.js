class ImageServiceMock {

  constructor() {
    this.images = {};
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
  }

  saveImage(id, imageData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.images[id] = imageData;
        resolve();
      }, this.responseMiliSec);
    });
  }

  getImage(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.images[id]), this.responseMiliSec);
    });
  }

}
