class InventoryModel {

  constructor() {
    this.isLoading = true;
    this.currentItem = null;
  }

  getCurrentItem() {
    return this.currentItem;
  }

  loadCurrentItem() {
    return ApiClient.instance.inventoryService.getRootGroup()
      .then((rootGroup) => this.currentItem = rootGroup)
      .finally(() => this.isLoading = false);
  }

}

class InventoryView {

  constructor(component) {
    this.id = 'inventory';
    this.component = component;
  }

  buildHTML() {
    if(this.component.model.isLoading || this.currentItem === null) {
      return `<div id='${this.id}' class='${this.id}'>
                ${ this.component.spinner.view.buildHTML() }
              </div>`;
    }

    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.header.view.buildHTML() }
              <div class='inventory_item'></div>
            </div>`;
  }

}

class Inventory {

  constructor() {
    this.model = new InventoryModel();
    this.view = new InventoryView(this);
    this.header = new InventoryHeader();
    this.spinner = new Spinner('inventory_spinner');
  }

  load() {
    this.spinner.show();
    this.model.loadCurrentItem()
      .catch((reason) => App.instance.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.updateElement(this.view);
      });
  }

}
