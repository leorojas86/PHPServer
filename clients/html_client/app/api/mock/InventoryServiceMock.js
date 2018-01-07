class InventoryServiceMock {

  constructor() {
    this.groups = {
      { id:'0', name:'folder 1', type:'0', parentId:null },
      { id:'2', name:'file 1', type:'1', parentId:'0' }
    };
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
  }

  getRootGroup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rootGroup = this.groups.find((group) => group.parentId === null);
        resolve(rootGroup);
      }, this.responseMiliSec);
    });
  }

}
