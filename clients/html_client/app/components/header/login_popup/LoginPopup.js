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
  }

  buildHTML() {
    if(this.component.model.isShown) {
      return `<div id='login_popup' class='login_popup popup_container'>
  					   <p class='margin_class'>[@email_text@]</p>
  						 <input type='text' id='user_email' class='margin_class' value='${ this.component.model.inputValues.email }'>
  			  		 <p class='margin_class'>[@password_text@]</p>
  			  		 <input type='text' id='user_password' class='margin_class' value='${ this.component.model.inputValues.password }'>
               <br/><br/>
  			  		 <button id='login_button'	class='margin_class'>
                <span class="lsf symbol">in</span> [@login_button_text@]
               </button>
  			  		 <br/><br/>
  			  		 <button id='register_button'	class='margin_class'>
                <span class="lsf symbol">plus</span> [@register_button_text@]
               </button>
               ${ this.component.spinner.view.buildHTML() }
  			  		</div>`;
    }

    return `<div id='login_popup'></div>`;
  }

  registerEvents() {
    Html.instance.registerElementClick('login_button', () => {
      const email = document.getElementById('user_email').value;
      const password = document.getElementById('user_password').value;
      this.component.onLoginButtonClick(email, password);
    });
    Html.instance.registerElementClick('register_button', () => this.component.onRegisterButtonClick());
  }

  refreshUI() {
    Html.instance.updateElement('login_popup', this);
  }

}

class LoginPopup {

  constructor() {
		this.model = new LoginPopupMode();
		this.view = new LoginPopupView(this);
    this.spinner = new Spinner('LoginPopupSpinner');
	}

  show() {
    this.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.model.isShown = false;
    this.view.refreshUI();
  }

  onLoginButtonClick(email, password) {
    this.spinner.show();
    ApiClient.instance.userService.login(email, password)
      .then((response) => {
        this.hide();
        App.instance.model.updateLoggedUser(response);
        App.instance.view.refreshUI();
      })
      .catch((reason) => {
        alert(reason);
      })
      .finally(() => this.spinner.hide());
  }

  onRegisterButtonClick() {
    this.hide();
  }

}
