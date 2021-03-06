class InventoryServiceMock {

  constructor() {
    this.items = [
      { id:'0', name:'home', type:'folder', parentId:null, children:['1','2', '3', '4'] },
      { id:'1', name:'Folder 1', type:'folder', parentId:'0', children:['5'] },
      { id:'2', name:'Arroz', type:'file', parentId:'0', unit:'3 kg', pricePerUnit:3300 },
      { id:'3', name:'Atún', type:'file', parentId:'0', unit:'200 g', pricePerUnit:900 },
      { id:'4', name:'Escoba', type:'file', parentId:'0', unit:'uni', pricePerUnit:2500 },
      { id:'5', name:'Folder 2', type:'folder', parentId:'1', children:[] },
    ];
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
    this.currentId = 3;
  }

  getRootItem() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rootItem = this.items.find((currentItem) => currentItem.parentId === null);
        resolve(rootItem);
      }, this.responseMiliSec);
    });
  }

  getItemById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = this.items.find((currentItem) => currentItem.id === id);
        resolve(item);
      }, this.responseMiliSec);
    });
  }

  getItemChildren(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const children = [];
        this.items.forEach((currentItem) => {
          if(item.children.includes(currentItem.id)) {
            children.push(currentItem);
          }
        });
        resolve(children);
      }, this.responseMiliSec);
    });
  }

  getItemPath(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = [];
        let pathItem = item;
        while(pathItem) {
          path.push({ id:pathItem.id, name:pathItem.name });
          pathItem = this.items.find((currentItem) => currentItem.id === pathItem.parentId);
        }
        path.reverse();
        resolve(path);
      }, this.responseMiliSec);
    });
  }

  deleteItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.items.splice(this.items.indexOf(item), 1);
        const parentItem = this.items.find((currentItem) => currentItem.id === item.parentId);
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);
        resolve();
      }, this.responseMiliSec);
    });
  }

  addChildItem(type, name, parentItem) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.currentId++;
        const id = `${this.currentId}`;
        this.items.push({ id:id, name:name, type:type, parentId:parentItem.id, children:[] });
        parentItem.children.push(id);
        resolve();
      }, this.responseMiliSec);
    });
  }

  renameItem(item, newName) {
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
  }

  saveItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Do nothing since the item is a reference and it is already updated
        resolve();
      }, this.responseMiliSec);
    });
  }

}
