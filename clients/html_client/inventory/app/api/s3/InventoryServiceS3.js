class InventoryServiceS3 {

  _getPathItemRecursively(item) {
    const pathItem = { id:item.id, name:item.name };
    if(item.parentId) {
      return getItemById(item.parentId)
        .then((parentItem) => {
          return this._getPathItemRecursively(parentItem)
            .then((path) => path.push(pathItem));
        });
    }
    return Promise.resolve([pathItem]);
  }

  getItemById(id) {
    return S3.instance.getItem(`item_${id}`);
  }

  getItemChildren(item) {
    const promises = item.children.map((childId) => S3.instance.getItem(`item_${childId}`));
    return Promise.all(promises);
  }

  getItemPath(item) {
    return this._getPathItemRecursively(item);
  }

  deleteItem(item) {
    getItemById(item.parentId)
      .then((parentItem) => {
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);//Delete from parent children
        return S3.instance.saveItem(`item_${item.parentId}`, parentItem);
      })
      .then(() => S3.instance.deleteItem(item.id));
  }

  addChildItem(type, name, parentItem) {
    const newItem = { id:GUIDUtils.generateNewGUID(), name:name, type:type, parentId:parentItem.id, children:[] };
    saveItem(newItem)
      .then(() => {
        parentItem.children.push(newItem.id);
        return S3.instance.saveItem(parentItem);
      });
  }

  /*renameItem(item, newName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        item.name = newName;
        resolve();
      }, this.responseMiliSec);
    });
  }

  moveItem(item, newParent) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const parentItem = this.items.find((currentItem) => currentItem.id === item.parentId);
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);
        newParent.children.push(item.id);
        item.parentId = newParent.id;
        resolve();
      }, this.responseMiliSec);
    });
  }*/

  saveItem(item) {
    return S3.instance.saveItem(`item_${item.id}`, item);
  }

}
