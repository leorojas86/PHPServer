class UserServiceS3 {

  constructor() {
    this.loggedUser = null;
  }

  getUser(email) {
    return S3.instance.getItem(`user_${email}`)
      .then((data) => JSON.parse(data.Body.toString()) )
  }

  register(email, password) {
    const data = JSON.stringify({ name: email, email: email, password: password, rootInventoryItemId:'0'});
    return S3.instance.addItem(`user_${email}`, data, 'application/json')
      .then(() => {
        return this.login(email, password);
      });
  }

  login(email, password) {
    return this.getUser(email)
      .then((user) => {
        if(user.password === password) { //TODO: Encript password
          this.loggedUser = user;
          return user;
        } else {
          throw { errorCode: 'invalid_credentials' };
        }
      });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.loggedUser = null;
      resolve();
    });
  }

}
