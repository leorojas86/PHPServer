class InventoryHeaderModel {

  constructor() {

  }

  getCurrentItem() {
    return App.instance.model.data.currentInventoryItem;
  }

}

class InventoryHeaderView {

  constructor(component) {
    this.id = 'inventory_header';
    this.component = component;
  }

  buildHTML() {
    const currentItem = this.component.model.getCurrentItem();

    return `<div id='${this.id}' class='${this.id}'>
              <span class='item_path'>${ currentItem ? currentItem.path : '' }</span>
            </div>`;
  }

}

class InventoryHeader {

  constructor() {
    this.model = new InventoryHeaderModel();
    this.view = new InventoryHeaderView(this);
  }

}
