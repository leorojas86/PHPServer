class SearchServiceMock {

  constructor() {
    this.searchData = [];
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
  }

  updateSearchData(item) {
    item.text = item.name;//TODO: remove this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const itemSearchData = this.searchData.find((searchData) => searchData.itemId === item);
        if (itemSearchData) {
          itemSearchData.text = item.text.toLowerCase();
        } else {
           this.searchData.push({ itemId:item.id, text:item.text.toLowerCase() });
        }
        resolve();
      }, this.responseMiliSec);
    });
  }

  searchForItems(text) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchText = text.toLowerCase();
        const matchingItemIds = this.searchData.filter((itemSearchData) => itemSearchData.text.includes(searchText));
        resolve(matchingItemIds);
      }, this.responseMiliSec);
    });
  }

}
