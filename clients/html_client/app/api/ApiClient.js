class ApiClient {
  constructor() {
    this.userService = new UserServiceMock();
  }
}

ApiClient.instance = new ApiClient();
