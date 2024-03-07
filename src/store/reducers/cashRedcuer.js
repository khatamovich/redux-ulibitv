const defaultState = {
	cash: 0,
};

export const cashReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case "ADD CASH": {
			console.log(type);

			return { ...state, cash: state.cash + payload };
		}

		case "GET CASH": {
			console.log(type);

			return { ...state, cash: state.cash - payload };
		}

		default:
			return state;
	}
};
