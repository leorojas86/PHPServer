class InventoryModel {

  constructor() {

  }

  get currentItem() {
    return App.instance.model.data.currentInventoryItem;
  }

  loadCurrentItem() {
    return ApiClient.instance.inventoryService.getRootGroup()
      .then((rootGroup) => App.instance.model.data.currentInventoryItem = rootGroup);
  }

}

class InventoryView {

  constructor(component) {
    this.id = 'inventory';
    this.component = component;
  }

  buildHTML() {
    const currentItem = this.component.model.currentItem;

    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.header.view.buildHTML() }
              <div class='inventory_item'>
                ${ currentItem ? currentItem.type : '...' }
              </div>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    if(!App.instance.model.data.currentInventoryItem) {
      this.component.refresh();
    }
  }

}

class Inventory {

  constructor() {
    this.model = new InventoryModel(this);
    this.view = new InventoryView(this);
    this.header = new InventoryHeader();
    this.spinner = new Spinner('inventory_spinner');
  }

  refresh() {
    this.spinner.show();
    this.model.loadCurrentItem()
      .catch((reason) => App.instance.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.updateElement(this.view);
      });
  }

}
