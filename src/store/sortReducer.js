const defaultState = {
  sort: 'cheapest',
  tabs: [
    { id: 1, value: 'cheapest', name: 'Самый дешевый' },
    { id: 2, value: 'fastest', name: 'Самый быстрый' },
  ],
}

const GET_FASTEST = 'GET_FASTEST'
const GET_CHEAPEST = 'GET_CHEAPEST'

const sortReducer = (state = defaultState, action = 0) => {
  switch (action.type) {
    case GET_FASTEST:
      return { ...state, sort: 'fastest' }
    case GET_CHEAPEST:
      return { ...state, sort: 'cheapest' }
    default:
      return state
  }
}

export default sortReducer
