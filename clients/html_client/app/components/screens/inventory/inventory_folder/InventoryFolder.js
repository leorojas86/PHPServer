class InventoryFolderModel {

  constructor() {
    this.children = null;
  }

  loadCurrentItemChildren() {
    return ApiClient.instance.inventoryService.getItemChildren(App.instance.model.data.currentInventoryItem)
      .then((children) => this.children = children);
  }
}

class InventoryFolderView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_folder';
  }

  buildHTML() {
    let children = '';
    this.component.children.forEach((child) => children += child.view.buildHTML() );

    return `<div id='${this.id}' class='${this.id}'>
              ${children}
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    if(!this.component.model.children) {
      this.component.load();
    }
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel();
    this.view = new InventoryFolderView(this);
    this.children = [];
    this.spinner = new Spinner('inventory_folder_spinner');
  }

  load() {
    this.spinner.show();
    this.model.loadCurrentItemChildren()
      .then(() => {
        this.children = [];
        this.model.children.forEach((child) => this.children.push(new InventoryFolderChild(`folder_child_${child.id}`, child)));
      })
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.updateElement(this.view);
      });
  }

}
