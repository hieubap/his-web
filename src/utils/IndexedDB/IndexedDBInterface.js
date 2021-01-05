import { xorBy } from 'lodash';

class IndexedDBInterface {
	constructor(props) {
		this.STORE_NAME = props.storeName;
		this.db = props.db;
	}

	putOne(data = {}) {
		const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
		const store = transaction.objectStore(this.STORE_NAME);

		store.add(data);

		transaction.oncomplete = () => { }
	};

	putMore(data = []) {
		const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
		const store = transaction.objectStore(this.STORE_NAME);

		const currentData = store.getAll();

		transaction.oncomplete = () => {
			const diff = xorBy(data, currentData.result, 'id');
			const addTransaction = this.db.transaction(this.STORE_NAME, 'readwrite');
			const addStore = addTransaction.objectStore(this.STORE_NAME);
			diff.forEach(item => {
				addStore.add(item);
			});

			addTransaction.oncomplete = () => {
				// handle completed
			};
		}
	};

	getOne = (id, callBack) => {
		const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
		const store = transaction.objectStore(this.STORE_NAME);

		if (id) {
			const data1 = store.get(id);

			transaction.onerror = (e) => {
			};

			transaction.oncomplete = () => {
				callBack(data1.result);
			};
		}
	};

	getAll = (callBack) => {
		const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
		const store = transaction.objectStore(this.STORE_NAME);
		const data = store.getAll();

		transaction.oncomplete = () => {
			callBack(data.result);
		};
	};
}

export default IndexedDBInterface;