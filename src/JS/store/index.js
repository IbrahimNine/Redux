import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import tasksReducer from "../reducers/reducer";

const store = createStore(tasksReducer, applyMiddleware(thunk));
export default store;
