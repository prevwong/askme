import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from "./auth";
import user from "./user";
import loader from "./loader";
// import contacts from "./contacts";

const rootReducer = combineReducers({
    auth,
    user,
    loader
    // contacts
});

export default persistReducer({
    key: 'root',
    storage: storage,
    blacklist: ['auth', 'loader', 'navigation']
}, rootReducer);
