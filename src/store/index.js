import { configureStore, combineReducers } from '@reduxjs/toolkit'

import sortReducer from './sortReducer'
import { filtersReducer } from './filtersReducer'
import { ticketsReducer } from './ticketsReducer'

const rootReducer = combineReducers({
  sort: sortReducer,
  filters: filtersReducer,
  tickets: ticketsReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export default store
