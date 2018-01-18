class InventoryContextMenuHelper {

  constructor() {
    this.cutingItem = null;
  }

  registerOnContextMenuEvent(inventoryElement) {
    inventoryElement.oncontextmenu = (event) => {
      const itemId = event.target.getAttribute('itemId');
      const item = itemId ? App.instance.inventory.model.currentItemComponent.model.children.find((currentItem) => currentItem.id === itemId) : null;
      App.instance.contextMenu.show(this.getMenuOptions(item), { x:event.clientX, y:event.clientY });
      return false;
    }
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
      case 'rename': this.renameItem(item);  break;
      case 'delete': this.deleteItem(item);  break;
      case 'add_file': this.addItem('file');  break;
      case 'add_folder': this.addItem('folder');  break;
      case 'paste': this.pastItem(item);  break;
    }
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
