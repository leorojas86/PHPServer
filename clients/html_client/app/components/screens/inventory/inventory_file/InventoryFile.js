class InventoryFileModel {

}

class InventoryFileView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_file';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>File</div>`;
  }

}

class InventoryFile {

  constructor() {
    this.model = new InventoryFileModel();
    this.view = new InventoryFileView(this);
  }

  load() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}
