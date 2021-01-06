import Zones from './Zones';

const DB_NAME = 'HIS_core';
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
    };

    request.onerror = e => {};

    request.onsuccess = e => {
      const db = e.currentTarget.result;

      callBack(true);
      Zones.onsuccess(db);
    };
  };
}

export default new IndexDB();
