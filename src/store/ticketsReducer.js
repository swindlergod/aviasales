/* eslint-disable no-await-in-loop */
const defaultState = {
  tickets: [],
  loading: true,
  count: 5,
}

export async function getSearchId() {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const { searchId } = await response.json()
  return searchId
}

export const getTickets = (payload) => ({ type: 'GET_TICKETS', payload })

export function getAllTickets(searchId) {
  return async function get(dispatch) {
    try {
      let stop = false
      while (stop === false) {
        const result = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
        const res = await result.json()
        stop = res.stop
        dispatch(getTickets(res.tickets))
      }
    } catch (e) {
      await get(dispatch)
    }
  }
}

const GET_TICKETS = 'GET_TICKETS'
const LOADING = 'LOADING'
const GET_MORE = 'GET_MORE'

export const ticketsReducer = (state = defaultState, action = 0) => {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      }

    case GET_MORE:
      return { ...state, count: state.count + 5 }

    case LOADING:
      return { ...state, loading: false }

    default:
      return state
  }
}
