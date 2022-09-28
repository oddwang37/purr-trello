import { CardsType, ColumnsType } from 'types/columns';

type Username = string;

export enum StorageKeys {
  cards = 'cards',
  columns = 'columns',
  username = 'username',
}

class StorageService {
  // ???????????????????????????????????????????????????????????????/
  setItem(storageKey: StorageKeys, data: CardsType | ColumnsType | Username): void {
    const stringifiedValue = JSON.stringify(data);
    localStorage.setItem(storageKey, stringifiedValue);
  }
  getItem(storageKey: StorageKeys): CardsType | ColumnsType | Username {
    const storageItem = localStorage.getItem(storageKey);
    if (storageItem) {
      let parsedItem;
      try {
        parsedItem = JSON.parse(storageItem);
      } catch (e) {
        parsedItem = storageItem;
      } finally {
        return parsedItem;
      }
    } else {
      return [];
    }
  }
}

export default StorageService;
