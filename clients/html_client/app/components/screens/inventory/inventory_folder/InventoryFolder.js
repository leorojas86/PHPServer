class InventoryFolderModel {

  constructor(component) {
    this.children = null;
    this.cutingItemId = null;
    this.component = component;
  }

  loadCurrentItemChildren() {
    this.children = null;
    return ApiClient.instance.inventoryService.getItemChildren(App.instance.model.data.currentInventoryItem)
      .then((children) => this.children = children);
  }

  getMenuOptions(itemType, itemId) {
    switch (itemType) {
      case 'folder':
      case 'file':
        return [
          { id:'rename', text:'[@rename_text@]', onClick: () => this.onClick('rename', itemId) },
          { id:'cut', text:'[@cut_text@]', onClick: () => this.onClick('cut', itemId) },
          { id:'delete', text:'[@delete_text@]', onClick: () => this.onClick('delete', itemId) }
        ];
      break;
      default:
        const defaultOptions = [
          { id:'add_file', text:'[@add_file_text@]', onClick: () => this.onClick('add_file', itemId) },
          { id:'add_folder', text:'[@add_folder_text@]', onClick: () => this.onClick('add_folder', itemId) }
        ];

        if(this.cutingItemId) {
          defaultOptions.push({ id:'paste', text:'[@paste_text@]', onClick: () => this.onClick('paste', itemId) });
        }

        return defaultOptions;
      break;
    }
  }

  onClick(action, itemId) {
    switch (action) {
      case 'cut': this.cutingItemId=itemId; break;
      default: this.component.onContextMenuOptionClicked(action, itemId); break;
    }
  }
}

class InventoryFolderView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_folder';
  }

  buildHTML() {
    let childrenHTML = '';
    this.component.children.forEach((child) => childrenHTML += child.view.buildHTML() );
    return `<div id='${this.id}' class='${this.id}'>
              ${childrenHTML}
            </div>`;
  }

  onDomUpdated() {
    this.component.children.forEach((child) => child.view.onDomUpdated());
    const element = document.getElementById(this.id);
    element.oncontextmenu = (event) => {
      const itemType = event.target.getAttribute('itemType');
      const itemId = event.target.getAttribute('itemId');
      App.instance.contextMenu.show(this.component.model.getMenuOptions(itemType, itemId), { x:event.clientX, y:event.clientY });
      return false;
    }
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel(this);
    this.view = new InventoryFolderView(this);
    this.children = [];
  }

  load() {
    this.children = [];
    return this.model.loadCurrentItemChildren()
      .then(() => {
        this.model.children.forEach((child) => this.children.push(new InventoryFolderChild(`${child.id}`, child)));
      });
  }

  onContextMenuOptionClicked(action, itemId) {
    let actionFunction = null;

    switch (action) {
      case 'rename':  break;
      case 'delete':  break;
      case 'add_file':  break;
      case 'add_folder':  break;
      case 'paste':  break;
    }
  }

}
