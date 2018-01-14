class DropdownMenuModel {

  constructor() {
    this.data = { options:[] };
    this.isShown = false;
  }

}

class DropdownMenuView {

  constructor(id, component) {
    this.id = id;
    this.component = component;
  }

  buildHTML() {
    let optionsHTML = '';
    if(this.component.model.isShown) {
      this.component.model.data.options.forEach((option) => {
        optionsHTML += `<button id='${option.id}' class='${option.id} option'>${option.text}</button>`;
      });
    }
    return `<div id='${this.id}' class='${this.id} dropdown_menu'>
              ${optionsHTML}
            </div>`;
  }

  onDomUpdated() {
    this.component.model.data.options.forEach((option) => {
      Html.registerClick(option.id, () => {
        this.component.hide();
        option.onClick();
      });
    });
  }

  setPosition(position) {
    console.log('position', position);
    const element = document.getElementById(this.id);
    element.style.position = "absolute";
    element.style.display  = 'inline';
		element.style.left 	   = position.x + "px";
		element.style.top  	   = position.y + "px";
  }

}

class DropdownMenu {

  constructor(id) {
    this.model = new DropdownMenuModel();
    this.view = new DropdownMenuView(id, this);
  }

  show(options, position) {
    this.model.data.options = options;
    this.model.isShown = true;
    Html.updateElement(this.view);
    this.view.setPosition(position);
    //document.onclick = () => this.hide();//TODO: Improve this
  }

  hide() {
    this.model.isShown = false;
    Html.updateElement(this.view);
  }

}
