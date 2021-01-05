import IndexedDBInterface from './IndexedDBInterface';

class Zones {
	constructor() {
		this.STORE_NAME = 'listZones';
		this.KEY_PATH = 'id';

		this.onupgradeneeded = (db) => {

			const availableStores = Object.keys(db.objectStoreNames).map(key => db.objectStoreNames[key]);
			if (!availableStores.includes(this.STORE_NAME)) {
				const store = db.createObjectStore(this.STORE_NAME, { keyPath: this.KEY_PATH });
				store.createIndex('ten', 'ten', { unique: false });
			}
		};

		this.onsuccess = (db) => {
			this.QUERY = new IndexedDBInterface({ storeName: this.STORE_NAME, db });
		};
	}

	putOne = (data) => this.QUERY.putOne(data);
	putMore = (data) => this.QUERY.putMore(data);
	getOne = (id, callback) => this.QUERY.getOne(id, callback);
	getAll = (callback) => this.QUERY.getAll(callback);
}

export default new Zones;
