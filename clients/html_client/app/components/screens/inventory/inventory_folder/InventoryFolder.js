class InventoryFolderModel {

  constructor(component) {
    this.component = component;
    this.children = [];
  }

  loadCurrentItemChildren() {
    return ApiClient.instance.inventoryService.getItemChildren(App.instance.model.data.currentInventoryItem)
      .then((children) => {
        this.children = children;
        return children;
      });
  }

}

class InventoryFolderView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_folder';
  }

  buildHTML() {
    let childrenHTML = '';
    this.component.children.forEach((child) => childrenHTML += child.view.buildHTML() );
    return `<div id='${this.id}' class='${this.id}'>
              ${childrenHTML}
            </div>`;
  }

  onDomUpdated() {
    this.component.children.forEach((child) => child.view.onDomUpdated());
    this.component.contextMenu.view.onDomUpdated();
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel(this);
    this.view = new InventoryFolderView(this);
    this.contextMenu = new InventoryContextMenu(this);
    this.children = [];
  }

  load() {
    return this.model.loadCurrentItemChildren()
      .then((children) => {
        this.children = children.map((child) => new InventoryFolderChild(`${child.id}`, child));
      });
  }

}
