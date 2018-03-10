class ApiClient {
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
}
