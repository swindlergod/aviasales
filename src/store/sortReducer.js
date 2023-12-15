const defaultState = {
    sort: 'cheapest'
}

const GET_FASTEST = 'GET_FASTEST'
const GET_CHEAPEST = 'GET_CHEAPEST'

export const sortReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_FASTEST:
            return {...state, sort: 'fastest'}
        case GET_CHEAPEST:
            return {...state, sort: 'cheapest'}
        default: 
            return state
    }
}