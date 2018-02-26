class SearchServiceMock {

  constructor() {
    this.searchData = [];
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
          const searchText = item.description != null ? item.description : item.name;
          const itemSearchData = this.searchData.find((searchData) => searchData.itemId === item.id);
          if (itemSearchData) {
            itemSearchData.description = searchText;
          } else {
             this.searchData.push({ itemId:item.id, description:searchText });
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
          const matchingItemIds = this.searchData.filter((itemSearchData) => {
            return this._prepareTextForSearch(itemSearchData.description).includes(searchText);
          });
          resolve(matchingItemIds);
        }
      }, this.responseMiliSec);
    });
  }

}
