import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from './reducers'
import { thunk } from "redux-thunk";

const store = createStore(rootReducer,applyMiddleware(thunk));
const persist = persistStore(store);

export default store;
export { persist };