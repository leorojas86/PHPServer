class LoginPopupMode {

  constructor() {
    this.isShown = false;
  }

  get inputValues() {
    return App.instance.model.data.env === 'prod' ? { email: '', password: ''} : { email: 'test@test.com', password: 'test'};
  }

}

class LoginPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'login_popup';
  }

  buildHTML() {
    return `<p class='margin_class'>[@email_text@]</p>
            <input type='text' id='${this.id}_user_email' class='margin_class' value='${this.component.model.inputValues.email}'>
            <p class='margin_class'>[@password_text@]</p>
            <input type='text' id='${this.id}_user_password' class='margin_class' value='${this.component.model.inputValues.password}'>
            <div>
              <button id='${this.id}_login_button' class='margin_class'>
               <span class="lsf symbol">in</span> [@login_button_text@]
              </button>
              <button id='${this.id}_register_button'	class='margin_class'>
               <span class="lsf symbol">plus</span> [@register_button_text@]
              </button>
            </div>
            ${ this.component.spinner.view.buildHTML() }`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_login_button`, () => {
      const email = document.getElementById(`${this.id}_user_email`).value;
      const password = document.getElementById(`${this.id}_user_password`).value;
      this.component.onLoginButtonClick(email, password);
    });
    Html.registerClick(`${this.id}_register_button`, () => this.component.onRegisterButtonClick());
  }

}

class LoginPopup {

  constructor() {
		this.model = new LoginPopupMode();
		this.view = new LoginPopupView(this);
    this.spinner = new Spinner('login_popup_spinner');
	}

  onLoginButtonClick(email, password) {
    this.spinner.show();
    ApiClient.instance.userService.login(email, password)
      .then((response) => {
        this.popup.hide();
        App.instance.model.updateLoggedUser(response);
        Html.updateElement(App.instance.view);
      })
      .catch((reason) => App.instance.handleError(reason, '[@login_failed_text@]'))
      .finally(() => this.spinner.hide());
  }

  onRegisterButtonClick() {
    this.popup.hide();
  }

}
