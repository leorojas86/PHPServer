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
    if(this.component.model.isShown) {
      return `<div id='${this.id}' class='${this.id} popup'>
               <div id='${this.id}_grayout' class='grayout'></div>
               <div class='container'>
    					   <p class='margin_class'>[@email_text@]</p>
    						 <input type='text' id='${this.id}_user_email' class='margin_class' value='${this.component.model.inputValues.email}'>
    			  		 <p class='margin_class'>[@password_text@]</p>
    			  		 <input type='text' id='${this.id}_user_password' class='margin_class' value='${this.component.model.inputValues.password}'>
                 <br/><br/>
    			  		 <button id='${this.id}_login_button'	class='margin_class'>
                  <span class="lsf symbol">in</span> [@login_button_text@]
                 </button>
    			  		 <br/><br/>
    			  		 <button id='${this.id}_register_button'	class='margin_class'>
                  <span class="lsf symbol">plus</span> [@register_button_text@]
                 </button>
                 ${ this.component.spinner.view.buildHTML() }
               </div>
  			  		</div>`;
    }

    return `<div id='${this.id}'></div>`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_login_button`, () => {
      const email = document.getElementById(`${this.id}_user_email`).value;
      const password = document.getElementById(`${this.id}_user_password`).value;
      this.component.onLoginButtonClick(email, password);
    });
    Html.registerClick(`${this.id}_register_button`, () => this.component.onRegisterButtonClick());
    Html.registerMouseDown(`${this.id}_grayout`, (event) => this.component.hide());
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }

}

class LoginPopup {

  constructor() {
		this.model = new LoginPopupMode();
		this.view = new LoginPopupView(this);
    this.spinner = new Spinner('login_popup_spinner');
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
        App.instance.messagePopup.show('[@login_failed_text@]', reason);
      })
      .finally(() => this.spinner.hide());
  }

  onRegisterButtonClick() {
    this.hide();
  }

}
