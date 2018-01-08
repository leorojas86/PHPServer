class InventoryHeaderModel {

  constructor() {

  }

}

class InventoryHeaderView {

  constructor() {
    this.id = 'inventory_header';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>Hello</div>`;
  }

}

class InventoryHeader {

  constructor() {
    this.model = new InventoryHeaderModel();
    this.view = new InventoryHeaderView();
  }

}
