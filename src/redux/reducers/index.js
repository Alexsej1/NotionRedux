import userReducer from './user';
import notesReducer from './notes'
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const userPersistConfig = {
    key: 'user',
    storage: storage,
    blacklist: ['loading', 'error']
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    notes: notesReducer
})

export default persistReducer(rootPersistConfig, rootReducer)
