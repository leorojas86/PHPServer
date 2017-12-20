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
    this.id = 'user_popup';
  }

  buildHTML() {
    if(this.component.model.isShown) {
      const user = this.component.model.user;
      return `<div id='${this.id}' class='${this.id} popup'>
                <div id='${this.id}_grayout' class='grayout'></div>
                <div class='container'>
    						 <p class='margin_class'>${ user.name }</p>
    						 <br/><br/>
    			  	   <button id='${this.id}_logout_button'	class='margin_class'>
                  <span class="lsf symbol">out</span> [@logout_button_text@]
                 </button>
                 ${ this.component.spinner.view.buildHTML() }
                </div>
  			  		</div>`;
    }

    return `<div id='user_popup'></div>`;
  }

  registerEvents() {
    Html.instance.registerClick(`${this.id}_logout_button`, () => this.component.onLogoutButtonClick());
    Html.instance.registerMouseDown(`${this.id}_grayout`, () => this.component.hide());
  }

  refreshUI() {
    Html.instance.updateElement(this.id, this);
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
