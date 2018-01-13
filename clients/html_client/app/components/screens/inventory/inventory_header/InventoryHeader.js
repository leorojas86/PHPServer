class InventoryHeaderModel {

  constructor() {

  }

  get currentItem() {
    return App.instance.model.data.currentInventoryItem;
  }

}

class InventoryHeaderView {

  constructor(component) {
    this.id = 'inventory_header';
    this.component = component;
  }

  buildHTML() {

    let path = '';
    if(this.component.model.currentItem) {
      const pathNames = this.component.model.currentItem.path;
      let index = 0;
      pathNames.forEach((currentItemName) => {
        if(index === 0) { //First one
          path += `<span id='path_${index}' class="lsf symbol home">home</span>`;
        } else if(index === pathNames.length - 1) { //Last one
          path += `<span class="lsf symbol arrow">right</span><span id='path_${index}'>${currentItemName}</span>`;
        } else {
          path += `<span class="lsf symbol arrow">right</span><span id='path_${index}' class='clickable_path_item'>${currentItemName}</span>`;
        }
        index++;
      });
    }

    return `<div id='${this.id}' class='${this.id}'>
              <div class='item_path'>
                ${path}
              </div>
              <span class="lsf symbol search">search</span>
            </div>`;
  }

  onDomUpdated() {
    if(this.component.model.currentItem) {
      let index = 0;
      const pathNames = this.component.model.currentItem.path;
      pathNames.forEach((currentItemName) => {
        if(index < pathNames.length - 1) { //Last one
          Html.registerClick(`path_${index}`, () => this.component.onPathItemClicked(index));
        }
        index++;
      });
    }
  }

}

class InventoryHeader {

  constructor() {
    this.model = new InventoryHeaderModel();
    this.view = new InventoryHeaderView(this);
  }

  onPathItemClicked(index) {
    const clickedPathItemId = this.model.currentItem.pathIds[index];
    App.instance.inventory.loadItem(clickedPathItemId);
  }

}
