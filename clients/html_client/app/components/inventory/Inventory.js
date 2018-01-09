class InventoryModel {

  constructor() {
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
    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.header.view.buildHTML() }
              <div class='inventory_item'></div>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
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
