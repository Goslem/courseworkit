import { createStore, combineReducers, applyMiddleware } from 'redux'
import { themeReducer } from './themeReducer'
import { localeReducer } from './localeReducer'
import { reducer as formReducer } from 'redux-form'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    theme: themeReducer,
    locale: localeReducer,
    form: formReducer,
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
