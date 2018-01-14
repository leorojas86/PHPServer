class InventoryFolderModel {

  constructor() {
    this.children = null;
  }

  loadCurrentItemChildren() {
    this.children = null;
    return ApiClient.instance.inventoryService.getItemChildren(App.instance.model.data.currentInventoryItem)
      .then((children) => this.children = children);
  }

  getMenuOptions() {
    return [
      { id:'add_file', text:'[@add_file_text@]', onClick: () => this.onClick('add_file') },
      { id:'add_folder', text:'[@add_folder_text@]', onClick: () => this.onClick('add_folder') }
    ];
  }

  onClick(action) {
    alert(action);
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
              ${ this.component.dropdownMenu.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    this.component.children.forEach((child) => child.view.onDomUpdated());
    const element = document.getElementById(this.id);
    element.oncontextmenu = (event) => {
      const position = { x:event.offsetX, y:event.offsetY + 25};
      this.component.dropdownMenu.show(this.component.model.getMenuOptions(), position);
      return false;
    }
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel();
    this.view = new InventoryFolderView(this);
    this.children = [];
    this.dropdownMenu = new DropdownMenu('inventory_folder_dropdown_menu');
  }

  load() {
    this.children = [];
    return this.model.loadCurrentItemChildren()
      .then(() => {
        this.model.children.forEach((child) => this.children.push(new InventoryFolderChild(`folder_child_${child.id}`, child)));
      });
  }

}
