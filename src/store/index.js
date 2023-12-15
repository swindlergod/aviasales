import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import { sortReducer } from './sortReducer'
import { filtersReducer } from './filtersReducer'
import { ticketsReducer } from './ticketsReducer'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({
    sort: sortReducer,
    filters: filtersReducer,
    tickets: ticketsReducer,
})

export const store = configureStore({ reducer: rootReducer }, composeWithDevTools(applyMiddleware(thunk)))
