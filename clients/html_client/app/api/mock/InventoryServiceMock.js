class InventoryServiceMock {

  constructor() {
    this.groups = [
      { id:'0', name:'/', type:'folder', path:'/', children:[1,2], parent:null },
      { id:'1', name:'folder 1', type:'folder', path:'/folder 1', children:[], parent:'0' },
      { id:'2', name:'file 1', type:'file', path:'/file 1', children:[], parent:'0' },
    ];
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
    this.currentId = 2;
  }

  getRootGroup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(ApiClient.instance.userService.loggedUser) {
          const rootGroup = this.groups.find((group) => group.parent === null);
          resolve(rootGroup);
          console.log('rootGroup', rootGroup);
        } else {
          resolve(null);
          console.log('rootGroup', null);
        }
      }, this.responseMiliSec);
    });
  }

}
