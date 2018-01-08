class InventoryModel {

  constructor() {
    this.isLoading = true;
  }

  getCurrentItem() {

  }

  loadCurrentItem() {

  }

}

class InventoryView {

  constructor(component) {
    this.id = 'inventory';
    this.component = component;
  }

  buildHTML() {
    if(this.isLoading) {
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
    this.model.loadCurrentItem()
      .catch((reason) => App.instance.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => Html.updateElement(this.view));
  }

}
