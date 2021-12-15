import clientUtils from "@utils/client-utils";
import cacheProvider from "@data-access/datacache-provider";

const initState = () => {
	let auth = cacheProvider.read("AUTH", "");
	if (auth) clientUtils.auth = "Bearer " + auth.access_token || "";
	return {
		auth: auth,
	};
};

const reducer = (state = initState(), action) => {
	let newState = { ...state };
	switch (action.type) {
		case "AUTH-UPDATE-DATA":
			newState = { ...state, ...(action.data || {}) };
			return newState;
		default:
			return state;
	}
};
export default reducer;
