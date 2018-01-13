class InventoryServiceMock {

  constructor() {
    this.items = [
      { id:'0', name:'#', type:'folder', children:['1','2'], path:['#'], pathIds:['0'] },
      { id:'1', name:'folder 1', type:'folder', children:['3'], path:['#', 'folder 1'], pathIds:['0'] },
      { id:'2', name:'file 1', type:'file', path:['#', 'file 1'], pathIds:['0'] },
      { id:'3', name:'folder 2', type:'folder', children:[], path:['#', 'folder 1', 'folder 2'], pathIds:['0','1'] },
    ];
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
    this.currentId = 2;
  }

  getRootItem() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(ApiClient.instance.userService.loggedUser) {
          const rootItem = this.items.find((currentItem) => currentItem.name === '#');
          resolve(rootItem);
        } else {
          resolve(null);
        }
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

  getItemById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = this.items.find((currentItem) => currentItem.id === id);
        resolve(item);
      }, this.responseMiliSec);
    });
  }

}
