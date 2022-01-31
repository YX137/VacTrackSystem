import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk"; //is used to pipeline the dispatched objects and give us a feeling of sync execution by being async
import promise from "redux-promise-middleware"; // Used by async calls to server endpoints

import user from "./state/user"
import vaccine from "./state/vaccine"
import hospital from "./state/hospital"
import vaccination from "./state/vaccination";

const LOGGER = () => (next) => (action) => {
    console.log("Redux middleware: logged action: ", action); 
    next(action)
}

export default createStore(combineReducers({
    user,
    vaccine,
    hospital,
    vaccination
}), {}, applyMiddleware(LOGGER, thunk, promise))