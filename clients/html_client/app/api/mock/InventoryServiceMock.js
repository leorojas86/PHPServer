class InventoryServiceMock {

  constructor() {

    this.items = [
      { id:'0', name:'#', path:['#'], type:'folder', children:['1','2'], pathIds:['0'] },
      { id:'1', name:'folder 1', path:['#', 'folder 1'], type:'folder', children:[], pathIds:['0','1'] },
      { id:'2', name:'file 1', path:['#', 'file 1'], type:'file', pathIds:['0','2'] },
    ];
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
    this.currentId = 2;
  }

  getRootItem() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(ApiClient.instance.userService.loggedUser) {
          const rootItem = this.items.find((group) => group.name === '#');
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
