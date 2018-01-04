class SpinnerModel {

  constructor(id) {
    this.isShown = false;
    this.elementId = `${ id }_spinner`;
  }

}

class SpinnerView {
  constructor(component) {
    this.component = component;
    this.id = component.model.elementId;
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
    this.model = new SpinnerModel(id);
    this.view = new SpinnerView(this);
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
