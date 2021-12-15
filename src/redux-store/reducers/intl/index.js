
import clientUtils from '@utils/client-utils';
import dataCacheProvider from '@data-access/datacache-provider';
const reducer = (state = {}, action) => {
	let newState = { ...state }
	switch (action.type) {
		case 'INTL-DATA':
			newState = { ...state, ...action.data || {} }
			let intl = action.data && action.data.locale
			dataCacheProvider.save('', "INTL-UPDATE-DATA", intl)
			clientUtils.intl = intl
			return newState;
		default:
			return state
	}

}
export default reducer
