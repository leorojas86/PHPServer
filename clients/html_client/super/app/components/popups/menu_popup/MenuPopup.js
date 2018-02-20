class MenuPopupModel {

}

class MenuPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'menu_popup';
  }

  buildHTML() {
    const user = AppData.instance.getUser();
    return `<div id='${this.id}'>
              <button id='${this.id}_cart_button'>
                <span class="lsf symbol">cart</span> [@cart_text@]
              </button>
              <button id='${this.id}_inventory_button'>
                <span class="lsf symbol">folder</span> [@inventory_text@]
              </button>
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_cart_button`, () => this.component.onMenuButtonClicked('cart'));
    Html.onClick(`${this.id}_inventory_button`, () => this.component.onMenuButtonClicked('inventory'));
  }

}

class MenuPopup {

  constructor() {
		this.model = new MenuPopupModel();
		this.view = new MenuPopupView(this);
	}

  onMenuButtonClicked(screen) {
    this.popup.hide();
    AppData.instance.setCurrentScreen(screen);
    Html.refresh(App.instance);
  }

}
