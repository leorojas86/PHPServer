class InventoryModel {

  constructor(component) {
    this.component = component;
  }

  get currentItemComponent() {
    const inventoryItem = App.instance.model.data.currentInventoryItem;
    return inventoryItem ? this.component.itemComponents[inventoryItem.type] : null;
  }

  loadCurrentItem() {
    return ApiClient.instance.inventoryService.getRootItem()
      .then((rootGroup) => App.instance.model.data.currentInventoryItem = rootGroup);
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
      this.component.load();
    }
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

  load() {
    this.spinner.show();
    this.model.loadCurrentItem()
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.updateElement(this.view);
      });
  }

}
