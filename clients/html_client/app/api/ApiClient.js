class ApiClient {
  constructor() {
    const environment = Config.get().environment;
    switch(environment) {
      case 'mock':
        this.userService = new UserServiceMock();
      break;
      default:
        console.error(`Unknown environment '${environment}'`);
      break;
    }
  }
}

ApiClient.instance = new ApiClient();
