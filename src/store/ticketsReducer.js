const defaultState = {
    tickets: [],
    loading: true,
    count: 5,
    filteredTickets: [],
}

export function getAllTickets() {
    return async function get(dispatch){
        try{
            const response = await fetch('https://aviasales-test-api.kata.academy/search')
            const { searchId } = await response.json()
            const result = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
            const res = await result.json()
            console.log(res)
            dispatch(getTickets(res.tickets))
        } catch(e) {
            const response = await fetch('https://aviasales-test-api.kata.academy/search')
            const { searchId } = await response.json()
            console.log(searchId)
            const result = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
            const res = await result.json()
            dispatch(getTickets(res.tickets))
        }        
    }
}

export const ticketsReducer = (state = defaultState, action) => {    
    switch(action.type){
    case 'GET_TICKETS': 
        return {
            ...state,
            tickets: [...state.tickets, ...action.payload],
            loading: false,
        }

    case 'GET_MORE':
        return {...state, count: state.count + 5 }

    case 'GET_WITHOUT':
        console.log('xax')
        const without = state.tickets.filter(ticket => ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0)
        return {...state, copyTickets: without}
    
    case 'GET_CHEAPEST2':
        const cheapest = state.tickets.sort((a,b) => a.price - b.price)
        return {...state, tickets: state.tickets.sort((a, b) => a.price - b.price)}
    
    case 'GET_FASTEST2':
        const fastest = state.tickets.sort((a,b) => (b.segments[0].duration + b.segments[1].duration) - (a.segments[0].duration + a.segments[1].duration))
        return {...state, tickets: fastest}

    default: return state
    
}
}

export const getTickets = (payload) => ({ type: 'GET_TICKETS', payload})