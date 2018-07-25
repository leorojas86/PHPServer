class ApiClient {

  static get instance() {
    if (ApiClient._instance) {
      return ApiClient._instance;
    }
    return ApiClient._instance = new ApiClient();
  }

  constructor() {
    const env = Config.get().CURRENT_ENVIRONMENT;
    switch(env) {
      case 'mock':
        this.userService = new UserServiceMock();
        this.inventoryService = new InventoryServiceMock();
        this.imageService = new ImageServiceMock();
        this.searchService = new SearchServiceMock();
        this.cartService = new CartServiceMock();
        this.inventoryService.items.forEach((item) => this.searchService.updateSearchData(item));
      break;
      default:
        S3.instance = new S3(Environments.get()[env].s3);
        this.userService = new UserServiceS3();
        this.inventoryService = new InventoryServiceS3();
        this.imageService = new ImageServiceS3();
        this.searchService = new SearchServiceS3();
        this.cartService = new CartServiceS3();
      break;
    }
  }

  _saveImageData(item, imageData) {
    if(item.image) {
      return this.imageService.saveImage(item.image, imageData)
        .then(() => item.image);
    } else {
      const imageId = Guid.generateNewGUID();
      return this.imageService.saveImage(imageId, imageData)
        .then(() => imageId);
    }
  }

  saveItem(item, imageData) {
    if(imageData) {
      return this._saveImageData(imageData)
        .then((imageId) => {
          item.image = imageId;
          this.searchService.updateSearchData(item);//TODO: should we queue this to the promise?
          return this.inventoryService.saveItem(item);
        });
    } else {
      item.image = undefined;
      this.searchService.updateSearchData(item);//TODO: should we queue this to the promise?
      return this.inventoryService.saveItem(item);
    }
  }
}
