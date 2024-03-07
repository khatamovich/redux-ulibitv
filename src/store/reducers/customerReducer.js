const defaultState = {
	isLoggedIn: false,
	customer: {
		name: "",
		transactions: [],
	},
};

export const customerReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case "LOGIN": {
			console.log(type);

			return {
				...state,
				isLoggedIn: true,
				customer: {
					...state.customer,
					name: "Muro Khatamovich",
				},
			};
		}

		case "LOGOUT": {
			console.log(type);

			return { ...state, isLoggedIn: false, customer: defaultState.customer };
		}

		case "ADD TRANSACTION": {
			console.log(type);

			return {
				...state,
				customer: {
					...state.customer,
					transactions: [payload, ...state.customer.transactions],
				},
			};
		}

		default:
			return state;
	}
};
