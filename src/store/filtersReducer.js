const defaultState = {
  filters: ['all', 'without', 'one', 'two', 'three'],
  checkboxes: [
    { id: 1, name: 'Все', value: 'all' },
    { id: 2, name: 'Без пересадок', value: 'without' },
    { id: 3, name: '1 пересадка', value: 'one' },
    { id: 4, name: '2 пересадки', value: 'two' },
    { id: 5, name: '3 пересадки', value: 'three' },
  ],
}

const GET_FILTERED = 'GET_FILTERED'

export const filtersReducer = (state = defaultState, action = 0) => {
  switch (action.type) {
    case GET_FILTERED:
      return { ...state, filters: action.payload }

    default:
      return state
  }
}

export const setFilter = (value) => ({ type: GET_FILTERED, payload: value })
