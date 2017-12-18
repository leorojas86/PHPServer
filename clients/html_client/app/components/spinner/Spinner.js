class SpinnerModel {

  constructor(id) {
    this.isShown = false;
    this.elementId = `${ id }_spinner`;
  }

}

class SpinnerView {
  constructor(component) {
    this.component = component;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      return `<div id='${ this.component.model.elementId }' class='loader'></div>`;
    }

    return `<div id='${ this.component.model.elementId }'></div>`;
  }

  refreshUI() {
    Html.instance.updateElement(this.component.model.elementId, this);
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
