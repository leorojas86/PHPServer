class InventoryHeaderModel {

  constructor(component) {
    this.component = component;
  }

  get currentItem() {
    return App.instance.model.data.currentInventoryItem;
  }

  updateBreadcrumbData() {
    this.component.breadcrumb.model.data.path = this.currentItem ? this.currentItem.path : [];
  }

}

class InventoryHeaderView {

  constructor(component) {
    this.id = 'inventory_header';
    this.component = component;
  }

  buildHTML() {
    this.component.model.updateBreadcrumbData();

    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.breadcrumb.view.buildHTML() }
              <span class="lsf symbol search">search</span>
            </div>`;
  }

  onDomUpdated() {
    this.component.breadcrumb.view.onDomUpdated();
  }

}

class InventoryHeader {

  constructor() {
    this.model = new InventoryHeaderModel(this);
    this.view = new InventoryHeaderView(this);
    this.breadcrumb = new Breadcrumb('inventory_breadcrumb', (index) => this.onPathItemClicked(index));
  }

  onPathItemClicked(index) {
    console.log('index', index);
    const clickedPathItemId = this.model.currentItem.pathIds[index];
    App.instance.inventory.loadItem(clickedPathItemId);
  }

}
