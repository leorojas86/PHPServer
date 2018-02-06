class RegistrationModel {

  constructor() {

  }

  validateRegistrationData(email, password, confirmPassword) {
    return new Promise((resolve, reject) => {
      if(!email || !password || !confirmPassword) {
        reject('Fields can not be empty.');//TODO: Use error code to localize this
      }
      else if(password !== confirmPassword) {
        reject('Passwords must match.');//TODO: Use error code to localize this
      } else {
        resolve();
      }
    });
  }

}

class RegistrationView {

  constructor(component) {
    this.component = component;
    this.id = 'registration_screen';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}' align='center'>
              <div class='container'>
                <p>[@email_text@]</p>
                <input type='text' id='${this.id}_user_email' value=''>
                <p>[@password_text@]</p>
                <input type='text' id='${this.id}_user_password' value=''>
                <p>[@confirm_password_text@]</p>
                <input type='text' id='${this.id}_confirm_user_password' value=''>
                <button id='${this.id}_register_button'>
                  <span class="lsf symbol">plus</span> [@register_button_text@]
                </button>
                ${ this.component.spinner.view.buildHTML() }
              </div>
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_register_button`, () => {
      const email = Html.getValue(`${this.id}_user_email`);
      const password = Html.getValue(`${this.id}_user_password`);
      const confirmPassword = Html.getValue(`${this.id}_confirm_user_password`);
      this.component.onRegisterButtonClick(email, password, confirmPassword);
    });
  }

}

class Registration {

  constructor() {
    this.view = new RegistrationView(this);
    this.model = new RegistrationModel(this);
    this.spinner = Html.addChild(new Spinner('registration_spinner'), this);
  }

  onRegisterButtonClick(email, password, confirmPassword) {
    this.spinner.show();
    this.model.validateRegistrationData(email, password, confirmPassword)
      .then(() => {
        ApiClient.instance.userService.register(email, password, confirmPassword)
          .then((response) => App.instance.onLoggedUserChanged(response))
          .catch((reason) => App.instance.handleError(reason, '[@login_failed_text@]'))
      })
      .catch((reason) => App.instance.messagePopup.show({ symbol:'trouble', title:'Registration Failed', message:reason }))//TODO: Localize this
      .finally(() => this.spinner.hide());
  }

}
