import { createStore, combineReducers, applyMiddleware } from 'redux'
import { themeReducer } from './themeReducer'
import { localeReducer } from './localeReducer'
import logger from 'redux-logger'
import thunkMiddleWare from 'redux-thunk'

const reducers = combineReducers({
    theme: themeReducer,
    locale: localeReducer,
})

let store = createStore(reducers, applyMiddleware(logger, thunkMiddleWare))

export default store
