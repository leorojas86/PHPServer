class PopupModel {

  constructor() {
    this.isShown = false;
  }

}

class PopupView {
  constructor(component, contentComponent) {
    this.component = component;
    this.contentComponent = contentComponent;
    this.id = contentComponent.view.id;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      return `<div id='${this.id}' class='${this.id} popup'>
                <div id='${this.id}_grayout' class='grayout'></div>
                <div class='container'>
    						 ${ this.contentComponent.view.buildHTML() }
                </div>
  			  		</div>`;
    }

    return `<div id='${this.id}'></div>`;
  }

  registerEvents() {
    Html.registerMouseDown(`${this.id}_grayout`, (event) => this.component.hide());
    this.contentComponent.view.registerEvents();
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }
}

class Popup {

  constructor(contentComponent) {
    this.model = new PopupModel();
		this.view = new PopupView(this, contentComponent);
    this.contentComponent = contentComponent;
    this.contentComponent.popup = this;
  }

  show(popupData) {
    this.contentComponent.model.data = popupData;
    this.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.model.isShown = false;
    this.view.refreshUI();
  }

}
