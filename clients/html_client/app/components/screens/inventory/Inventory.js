class InventoryModel {

  constructor(component) {
    this.component = component;
  }

  get currentItemComponent() {
    const inventoryItem = App.instance.model.data.currentInventoryItem;
    return inventoryItem ? this.component.itemComponents[inventoryItem.type] : null;
  }

  clearCurrentItemComponent() {
    if (this.currentItemComponent) {
      this.currentItemComponent.clear();
    }
  }

  loadRootItem() {
    return ApiClient.instance.inventoryService.getRootItem()
      .then((rootItem) => App.instance.model.data.currentInventoryItem = rootItem);
  }

  loadItem(id) {
    return ApiClient.instance.inventoryService.getItemById(id)
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
    if(this.component.model.currentItemComponent) {
      this.component.model.currentItemComponent.view.onDomUpdated();
    } else {
      this.component.loadRootItem();
    }

    this.component.header.view.onDomUpdated();
  }

}

class Inventory {

  constructor() {
    this.model = new InventoryModel(this);
    this.view = new InventoryView(this);
    this.header = new InventoryHeader();
    this.spinner = new Spinner('inventory_spinner');
    this.itemComponents = {
      'folder': new InventoryFolder(),
      'file': new InventoryFile()
    };
  }

  loadRootItem() {
    this.model.clearCurrentItemComponent();
    this.spinner.show();
    this.model.loadRootItem()
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.updateElement(this.view);
      });
  }

  loadItem(id) {
    this.model.clearCurrentItemComponent();
    this.spinner.show();
    this.model.loadItem(id)
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.updateElement(this.view);
      });
  }

}
