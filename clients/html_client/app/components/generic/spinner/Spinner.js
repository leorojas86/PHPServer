class SpinnerModel {

  constructor() {
    this.isShown = false;
  }

}

class SpinnerView {
  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      return `<div id='${this.id}' class='spinner'>
                <div id='${this.id}_animation' class='spinner_animation'></div>
              </div>`;
    }

    return `<div id='${this.id}'></div>`;
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }

  registerEvents() {

  }
}

class Spinner {

  constructor(id) {
    this.model = new SpinnerModel();
    this.view = new SpinnerView(this, id);
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
