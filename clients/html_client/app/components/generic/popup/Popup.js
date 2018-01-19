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
                <div class='modal_content'>
    						 ${ this.contentComponent.view.buildHTML() }
                </div>
  			  		</div>`;
    }

    return `<div id='${this.id}'></div>`;
  }

  onDomUpdated() {
    if(this.component.model.isShown) {
      Html.onMouseDown(`${this.id}_grayout`, () => this.component.hide());
      this.contentComponent.view.onDomUpdated();
    }
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
    Html.updateElement(this.view);
  }

  hide() {
    this.model.isShown = false;
    Html.updateElement(this.view);
  }

}
