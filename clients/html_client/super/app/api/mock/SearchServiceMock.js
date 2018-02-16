class SearchServiceMock {

  constructor() {
    this.searchData = [];
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
  }

  updateSearchData(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchText = item.description || item.name;
        const itemSearchData = this.searchData.find((searchData) => searchData.itemId === item.id);
        if (itemSearchData) {
          itemSearchData.text = searchText.toLowerCase();
        } else {
           this.searchData.push({ itemId:item.id, text:searchText.toLowerCase() });
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
