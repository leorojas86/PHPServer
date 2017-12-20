class UserPopupModel {

  constructor() {
    this.isShown = false;
  }

  get user() {
    return App.instance.model.data.user;
  }

}

class UserPopupView {

  constructor(component) {
    this.component = component;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      const user = this.component.model.user;
      return `<div id='user_popup' class='user_popup popup'>
                <div id='logout_popup_grayout' class='grayout'></div>
                <div class='container'>
    						 <p class='margin_class'>${ user.name }</p>
    						 <br/><br/>
    			  	   <button id='logout_button'	class='margin_class'>
                  <span class="lsf symbol">out</span> [@logout_button_text@]
                 </button>
                 ${ this.component.spinner.view.buildHTML() }
                </div>
  			  		</div>`;
    }

    return `<div id='user_popup'></div>`;
  }

  registerEvents() {
    Html.instance.registerClick('logout_button', () => this.component.onLogoutButtonClick());
    Html.instance.registerMouseDown('logout_popup_grayout', (event) => this.component.hide());
  }

  refreshUI() {
    Html.instance.updateElement('user_popup', this);
  }

}

class UserPopup {

  constructor() {
		this.model = new UserPopupModel();
		this.view = new UserPopupView(this);
    this.spinner = new Spinner('UserPopupSpinner');
	}

  show() {
    this.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.model.isShown = false;
    this.view.refreshUI();
  }

  onLogoutButtonClick() {
    this.spinner.show();
    ApiClient.instance.userService.logout()
      .finally(() => {
        this.spinner.hide();
        this.hide();
        App.instance.model.updateLoggedUser(null);
        App.instance.view.refreshUI();
      });
  }

}
