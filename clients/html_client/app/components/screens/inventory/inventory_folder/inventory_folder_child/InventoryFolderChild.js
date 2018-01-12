class InventoryFolderChildModel {
  constructor(data) {
    this.data = data;
  }
}

class InventoryFolderChildView {

  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    return `<div id='${this.id}' class='inventory_folder_child'>${this.component.model.data.name}</div>`;
  }

}

class InventoryFolderChild {

  constructor(id, data) {
    this.model = new InventoryFolderChildModel(data);
    this.view = new InventoryFolderChildView(this, id);
  }

}
