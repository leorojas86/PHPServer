class InventoryServiceS3 {

  _getPathItemRecursively(item) {
    const pathItem = { id:item.id, name:item.name };
    if(item.parentId) {
      return this.getItemById(item.parentId)
        .then((parentItem) => this._getPathItemRecursively(parentItem))
        .then((path) => {
          path.push(pathItem);
          return path;
        });
    }
    return Promise.resolve([pathItem]);
  }

  _checkForExistingRootItem() {
    return S3.instance.hasItem('inventory_root_item')
      .then((hasItem) => {
        //TODO: Check when should this be created
        /*if(!hasItem) {
          const newItem = { id:'inventory_root_item', name:'home', type:'folder', parentId:null, children:[] };
          return S3.instance.saveItem('inventory_root_item', newItem);
        }*/
      });
  }

  getRootItem() {
    return this._checkForExistingRootItem()
      .then(() => S3.instance.getItem('inventory_root_item'));
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

  _deleteRecursively(item) {
    const deleteChildrenPromises = item.children.map((childId) => {
      return S3.instance.getItem(`item_${childId}`)
        .then((item) => this._deleteRecursively(item));
    });
    return Promise.all(deleteChildrenPromises)
      .then(() => S3.instance.deleteItem(`item_${item.id}`));
  }

  deleteItem(item) {
    return this.getItemById(item.parentId)
      .then((parentItem) => {
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);//Delete from parent children
        return this.saveItem(parentItem);
      })
      .then(() => this._deleteRecursively(item));
  }

  addChildItem(type, name, parentItem) {
    const newItem = { id:Guid.generateNewGUID(), name:name, type:type, parentId:parentItem.id, children:[] };
    parentItem.children.push(newItem.id);
    return this.saveItem(newItem)
      .then(() => this.saveItem(parentItem));
  }

  renameItem(item, newName) {
    item.name = newName;
    return this.saveItem(item);
  }

  moveItem(item, newParent) {
    return this.getItemById(item.parentId)
      .then((parentItem) => {
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);//Delete from parent children
        return this.saveItem(parentItem);
      })
      .then(() => {
        item.parentId = newParent.id;
        newParent.children.push(item.id);
        return this.saveItem(item)
          .then(() => this.saveItem(newParent))
      });
  }

  saveItem(item) {
    return S3.instance.saveItem(`item_${item.id}`, item);
  }

}
