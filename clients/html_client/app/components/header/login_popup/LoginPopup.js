class LoginPopupMode {

  constructor() {
    this.isShown = false;
  }

}

class LoginPopupView {

  constructor(component) {
    this.component = component;
  }

  buildHTML() {
    const defaultValues = "leo";//TODO: Pull this from a config file

    if(this.component.model.isShown) {
      return `<div id='login_popup' class='login_popup popup_container'>
  						  <p class='margin_class'>[@email_text@]</p>
  						  <input type='text' id='user_email' class='margin_class' value='${ defaultValues }'>
  			  			<p class='margin_class'>[@password_text@]</p>
  			  			<input type='text' id='user_password' class='margin_class' value='${ defaultValues }'>
                <br/><br/>
  			  			<button id='login_button'	class='login_button button_class margin_class'><span class="lsf symbol">in</span> [@login_button_text@]</button>
  			  			<br><br>
  			  			<button id='register_button'	class='register_button button_class margin_class'><span class="lsf symbol">plus</span> [@register_button_text@]</button>
  			  		</div>`;
    }

    return `<div id='login_popup'/>`;
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
    ApiClient.instance.userService.login(email, password)
      .then((response) => {
        App.instance.model.updateLoggedUser(response);
        App.instance.view.refreshUI();
        this.hide();
      })
      .catch((reason) => {
        alert(reason);
      });
  }

  onRegisterButtonClick() {
    this.hide();
  }

}
