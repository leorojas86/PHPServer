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
  						  <input type='text' id='user_email' class='input_class margin_class' value='${ defaultValues }'>
                <br/><br/>
  			  			<p class='margin_class'>[@password_text@]</p>
  			  			<input type='text' id='user_password' class='input_class margin_class' value='${ defaultValues }'>
                <br/><br/>
  			  			<button id='login_button'	class='button_class margin_class'>[@login_button_text@]</button>
  			  			<br><br>
  			  			<button id='register_button'	class='button_class margin_class'>[@register_button_text@]</button>
  			  		</div>`;
    }

    return `<div id='login_popup'/>`;
  }

  registerEvents() {
    document.getElementById('login_button').onclick = () => this.component.onLoginButtonClick();
    document.getElementById('register_button').onclick = () => this.component.onRegisterButtonClick();
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

  onLoginButtonClick() {
    this.hide();
  }

  onRegisterButtonClick() {
    this.hide();
  }

}
