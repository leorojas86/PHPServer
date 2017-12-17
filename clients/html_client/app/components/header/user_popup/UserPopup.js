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
      return `<div id='user_popup' class='user_popup popup_container'>
  						 <p class='margin_class'>${ user.name }</p>
  						 <br/><br/>
  			  	   <button id='logout_button'	class='margin_class'><span class="lsf symbol">out</span> [@logout_button_text@]</button>
  			  		</div>`;
    }

    return `<div id='user_popup'/>`;
  }

  registerEvents() {
    Html.instance.registerElementClick('logout_button', () => this.component.onLogoutButtonClick());
  }

  refreshUI() {
    Html.instance.updateElement('user_popup', this);
  }

}

class UserPopup {

  constructor() {
		this.model = new UserPopupModel();
		this.view = new UserPopupView(this);
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
    ApiClient.instance.userService.logout()
      .finally(() => {
        this.hide();
        App.instance.model.updateLoggedUser(null);
        App.instance.view.refreshUI();
      });
  }

}
