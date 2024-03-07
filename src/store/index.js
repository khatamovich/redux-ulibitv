import { createStore } from "redux";
import { combineReducers } from "redux";
import { cashReducer } from "./reducers/cashRedcuer";
import { customerReducer } from "./reducers/customerReducer";

const combinedReducers = combineReducers({
	cashReducer,
	customerReducer,
});

export const store = createStore(combinedReducers);
