class UserServiceMock {

  constructor() {
    this.users = [
      { name: 'leo', email: 'leo', password: 'leo' }
    ];
    this.loggedUser = null;
  }

  register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { name: name, email: email, password: password };
        this.users.push(newUser);
        resolve(newUser);
      }, 4000);
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = this.users.find((user) => user.email === email && user.password === password);

        if(foundUser) {
          this.loggedUser = foundUser;
          resolve(foundUser);
        }
        else {
          reject('user not found');
        }
      }, 4000);
    });
  }

}
