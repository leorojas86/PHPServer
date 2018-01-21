class InventoryModel {

  constructor(component) {
    this.component = component;
  }

  get currentItemComponent() {
    const inventoryItem = App.instance.model.data.currentInventoryItem;
    return inventoryItem ? this.component.itemComponents[inventoryItem.type] : null;
  }

  loadItem(id) {
    return (id ? ApiClient.instance.inventoryService.getItemById(id) : ApiClient.instance.inventoryService.getRootItem())
      .then((item) => App.instance.model.data.currentInventoryItem = item);
  }

}

class InventoryView {

  constructor(component) {
    this.id = 'inventory';
    this.component = component;
  }

  buildHTML() {
    const component = this.component.model.currentItemComponent;

    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.header.view.buildHTML() }
              ${ component ? component.view.buildHTML() : '' }
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    if(!this.component.model.currentItemComponent) {
      this.component.loadItem();
    }
  }

}

class Inventory {

  constructor() {
    this.model = new InventoryModel(this);
    this.view = new InventoryView(this);
    this.header = Html.addChild(new InventoryHeader(), this);
    this.spinner = Html.addChild(new Spinner('inventory_spinner'), this);
    this.inventoryFolder = Html.addChild(new InventoryFolder(), this);
    this.inventoryFile = Html.addChild(new InventoryFile(), this);
    this.itemComponents = {
      'folder': this.inventoryFolder,
      'file': this.inventoryFile
    };
  }

  loadItem(id) {
    this.exectuteAction(() => this.model.loadItem(id));
  }

  exectuteAction(actionPromise) {
    this.spinner.show();
    actionPromise()
      .then(() => this.header.load())
      .then(() => this.model.currentItemComponent.load())
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

}
