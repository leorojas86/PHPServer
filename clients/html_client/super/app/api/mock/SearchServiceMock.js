class SearchServiceMock {

  constructor() {
    this.searchData = [];
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
  }

  updateSearchData(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(item.type === 'file') {
          const searchText = item.description != null ? `${item.description} ${item.name}` : item.name;
          const itemSearchData = this.searchData.find((searchData) => searchData.itemId === item.id);
          if (itemSearchData) {
            itemSearchData.description = searchText.toLowerCase();
          } else {
             this.searchData.push({ itemId:item.id, description:searchText.toLowerCase() });
          }
        }
        resolve();
      }, this.responseMiliSec);
    });
  }

  searchForItems(text) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(text === '') {
          resolve([]);
        } else {
          const searchText = text.toLowerCase();
          const matchingItemIds = this.searchData.filter((itemSearchData) => itemSearchData.description.includes(searchText));
          resolve(matchingItemIds);
        }
      }, this.responseMiliSec);
    });
  }

}
