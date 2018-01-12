class InventoryFolderModel {

}

class InventoryFolderView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_folder';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>Folder</div>`;
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel();
    this.view = new InventoryFolderView(this);
  }

}
