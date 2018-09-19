import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist';

export default () => {
    let store = createStore(rootReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}
