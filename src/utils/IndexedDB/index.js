import Zones from './Zones';
import Provinces from './Provinces';
const DB_NAME = 'medi-plus';
const DB_VERSION = 5;

class IndexDB {
  constructor() {
    this.db = null;
  }

  open = callBack => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = e => {
      const db = e.currentTarget.result;
      Zones.onupgradeneeded(db);
      Provinces.onupgradeneeded(db);
    };

    request.onerror = e => {};

    request.onsuccess = e => {
      const db = e.currentTarget.result;

      callBack(true);
      Zones.onsuccess(db);
      Provinces.onsuccess(db);
    };
  };
}

export default new IndexDB();
