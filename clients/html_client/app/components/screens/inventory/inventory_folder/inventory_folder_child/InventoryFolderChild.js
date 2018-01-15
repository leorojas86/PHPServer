class InventoryFolderChildModel {
  constructor(data) {
    this.data = data;
  }

  setCurrentInventoryItem() {
    App.instance.model.data.currentInventoryItem = this.data;
  }
}

class InventoryFolderChildView {

  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    return `<div id='${this.id}' class='inventory_folder_child'>
              <span id='${this.id}_icon' class='lsf symbol'>${this.component.model.data.type}</span>
              <span id='${this.id}_name' class='name'>${this.component.model.data.name}</span>
            </div>`;
  }

  onDomUpdated() {
    Html.registerClick(this.id, () => this.component.onClick());
  }

}

class InventoryFolderChild {

  constructor(id, data) {
    this.model = new InventoryFolderChildModel(data);
    this.view = new InventoryFolderChildView(this, id);
  }

  onClick() {
    App.instance.inventory.loadItem(this.model.data.id);
  }

}
