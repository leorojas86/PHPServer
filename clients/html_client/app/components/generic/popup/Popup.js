class PopupModel {

  constructor(id) {
    this.isShown = false;
    this.elementId = id;
  }

}

class PopupView {
  constructor(component, id) {
    this.component = component;
    this.id = component.model.elementId;
  }

  buildHTML(content) {
    if(this.component.model.isShown) {
      const user = this.component.model.user;
      return `<div id='${this.id}' class='${this.id} popup'>
                <div id='${this.id}_grayout' class='grayout'></div>
                <div class='container'>
    						 ${content}
                </div>
  			  		</div>`;
    }

    return `<div id='${this.id}'></div>`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_ok_button`, () => this.component.hide());
    Html.registerMouseDown(`${this.id}_grayout`, (event) => this.component.hide());
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }
}

class Popup {

  constructor(id) {
    this.model = new PopupModel(id);
		this.view = new PopupView(this);
  }

  show() {
    this.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.model.isShown = false;
    this.view.refreshUI();
  }

}
