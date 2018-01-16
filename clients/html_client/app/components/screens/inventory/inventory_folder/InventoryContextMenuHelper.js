class InventoryContextMenuHelper {

  constructor() {
    this.cutingItemId = null;
  }

  registerOnContextMenuEvent(inventoryElement) {
    inventoryElement.oncontextmenu = (event) => {
      const itemType = event.target.getAttribute('itemType');
      const itemId = event.target.getAttribute('itemId');
      App.instance.contextMenu.show(this.getMenuOptions(itemType, itemId), { x:event.clientX, y:event.clientY });
      return false;
    }
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
      case 'rename':  break;
      case 'delete': this.deleteItem(itemId);  break;
      case 'add_file':  break;
      case 'add_folder':  break;
      case 'paste':  break;
    }
  }

  deleteItem(itemId) {
    const action = () => ApiClient.instance.inventoryService.deleteItem(itemId);
    App.instance.inventory.exectuteAction(action);
  }

}
