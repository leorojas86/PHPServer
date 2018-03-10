class SearchServiceS3 {

  constructor() {
    this.searchItems = null;
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

  _getSearchItems() {
    return new Promise((resolve, reject) => {
      if(this.searchItems) {
        resolve(this.searchItems);
      } else {
        S3.instance.getItemWithDefault('search_data', { items:[] })
          .then((data) => {
            this.searchItems = data.items;
            resolve(this.searchItems);
          })
          .catch(reject);
      }
    });
  }

  _saveSearchItems(searchItems) {
    this.searchItems = searchItems;
    return S3.instance.saveItem('search_data', { items:searchItems });
  }

  updateSearchData(item) {
    return new Promise((resolve, reject) => {
      if(item.type === 'file') {
        S3.instance.getItemWithDefault('search_data', { items:[] })
          .then((data) => {
            const searchItems = data.items;
            const itemSearchData = searchItems.find((searchData) => searchData.itemId === item.id);
            const searchText = item.description || item.name;
            if (itemSearchData) {
              itemSearchData.description = searchText;
            } else {
               searchItems.push({ itemId:item.id, description:searchText });
            }
            this._saveSearchItems(searchItems)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      } else {
        resolve();
      }
    });
  }

  searchForItems(text) {
    return this._getSearchItems()
      .then((searchItems) => {
        if(text === '') {
          return [];
        } else {
          const searchText = this._prepareTextForSearch(text);
          const matchingItemIds = searchItems.filter((itemSearchData) => {
            return this._prepareTextForSearch(itemSearchData.description).includes(searchText);
          });
          return matchingItemIds;
        }
      });
  }

}
