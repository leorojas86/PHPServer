class InventoryServiceMock {

  constructor() {
    this.items = [
      { id:'0', name:'/', path:'/', type:'folder', children:['1','2'], parent:null },
      { id:'1', name:'folder 1', path:'/folder 1', type:'folder', children:[], parent:'0' },
      { id:'2', name:'file 1', path:'/file 1', type:'file', parent:'0' },
    ];
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
    this.currentId = 2;
  }

  getRootItem() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(ApiClient.instance.userService.loggedUser) {
          const rootItem = this.items.find((group) => group.parent === null);
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

}
