class InventoryContextMenuModel {

  constructor(component) {
    this.cutingItem = null;
    this.component = component;
  }

  getMenuOptions(item) {
    if(item) {
      return [
        { id:'rename', text:'[@rename_text@]', onClick: () => this.onClick('rename', item) },
        { id:'cut', text:'[@cut_text@]', onClick: () => this.onClick('cut', item) },
        { id:'delete', text:'[@delete_text@]', onClick: () => this.onClick('delete', item) }
      ];
    } else {
      const defaultOptions = [
        { id:'add_file', text:'[@add_file_text@]', onClick: () => this.onClick('add_file', item) },
        { id:'add_folder', text:'[@add_folder_text@]', onClick: () => this.onClick('add_folder', item) }
      ];
      if(this.cutingItem) {
        defaultOptions.push({ id:'paste', text:'[@paste_text@]', onClick: () => this.onClick('paste', item) });
      }
      return defaultOptions;
    }
  }

  onClick(action, item) {
    switch (action) {
      case 'cut': this.cutingItem=item; break;
      case 'rename': this.component.renameItem(item);  break;
      case 'delete': this.component.deleteItem(item);  break;
      case 'add_file': this.component.addItem('file');  break;
      case 'add_folder': this.component.addItem('folder');  break;
      case 'paste': this.component.pastItem(item);  break;
    }
  }

}

class InventoryContextMenuView {

  constructor(component, inventoryFolder) {
    this.component = component;
    this.inventoryFolder = inventoryFolder;
  }

  onDomUpdated() {
    const inventoryElement = document.getElementById(this.inventoryFolder.view.id);
    inventoryElement.oncontextmenu = (event) => {
      const itemId = event.target.getAttribute('itemId');
      const item = itemId ? this.inventoryFolder.model.children.find((currentItem) => currentItem.id === itemId) : null;
      App.instance.contextMenu.show(this.component.model.getMenuOptions(item), { x:event.clientX, y:event.clientY });
      return false;
    }
  }

}

class InventoryContextMenu {

  constructor() {
    this.model = new InventoryContextMenuModel(this);
    this.view = new InventoryContextMenuView(this);
  }

  addItem(itemType) {
    App.instance.textPromptPopup.show({
      title:`[@add_${itemType}_text@]`,
      placeholder:'[@name_text@]',
      onTextEntered: (text) => {
        const action = () => ApiClient.instance.inventoryService.addItem(itemType, text, App.instance.model.data.currentInventoryItem);
        App.instance.inventory.exectuteAction(action);
      }
    });
  }

  deleteItem(item) {
    const action = () => ApiClient.instance.inventoryService.deleteItem(item);
    App.instance.inventory.exectuteAction(action);
  }

  renameItem(item) {
    App.instance.textPromptPopup.show({
      title:`[@change_name_text@]`,
      placeholder:'[@name_text@]',
      value: item.name,
      onTextEntered: (text) => {
        const action = () => ApiClient.instance.inventoryService.renameItem(item, text);
        App.instance.inventory.exectuteAction(action);
      }
    });
  }

  pasteItem(item) {

  }
}
