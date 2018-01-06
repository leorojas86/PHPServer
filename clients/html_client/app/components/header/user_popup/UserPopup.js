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
    const user = this.component.model.user || {};
    return this.component.popup.view.buildHTML(
       `<p class='margin_class'>${user.name}</p>
        <button id='${this.id}_logout_button' class='margin_class'>
         <span class="lsf symbol">out</span> [@logout_button_text@]
        </button>
        ${ this.component.spinner.view.buildHTML() }`
     );
  }

  registerEvents() {
    Html.registerClick(`${this.id}_logout_button`, () => this.component.onLogoutButtonClick());
    Html.registerMouseDown(`${this.id}_grayout`, () => this.component.hide());
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }

}

class UserPopup {

  constructor() {
		this.model = new UserPopupModel();
		this.view = new UserPopupView(this);
    this.spinner = new Spinner('user_popup_spinner');
    this.popup = new Popup(this.view.id);
	}

  show() {
    this.popup.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.model.isShown = false;
    this.popup.view.refreshUI();
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
