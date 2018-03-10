class SearchServiceMock {

  constructor() {
    this.searchItems = [];
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
  }

  _prepareTextForSearch(text) {
    let searchText = text.toLowerCase();
    searchText = searchText.replace(/á/g, 'a');
    searchText = searchText.replace(/é/g, 'e');
    searchText = searchText.replace(/í/g, 'i');
    searchText = searchText.replace(/ó/g, 'o');
    searchText = searchText.replace(/ú/g, 'u');
    searchText = searchText.replace(/ñ/g, 'n');
    return searchText;
  }

  updateSearchData(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(item.type === 'file') {
          const itemSearchData = this.searchItems.find((searchData) => searchData.itemId === item.id);
          const searchText = item.description || item.name;
          if (itemSearchData) {
            itemSearchData.description = searchText;
          } else {
             this.searchItems.push({ itemId:item.id, description:searchText });
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
          const searchText = this._prepareTextForSearch(text);
          const matchingItemIds = this.searchItems.filter((itemSearchData) => {
            return this._prepareTextForSearch(itemSearchData.description).includes(searchText);
          });
          resolve(matchingItemIds);
        }
      }, this.responseMiliSec);
    });
  }

}
