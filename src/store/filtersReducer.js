const defaultState = {
    filters: []
}

const GET_ALL = 'GET_ALL'
const GET_WITHOUT = 'GET_WITHOUT'
const GET_ONE = 'GET_ONE'
const GET_TWO = 'GET_TWO'
const GET_THREE = 'GET_THREE'
const GET_FILTERED = 'GET_FILTERED'

export const filtersReducer = (state = defaultState, action) => {
    
    if (state.filters.some(filter => filter === action.payload)) {
        const filteredState = state.filters.filter(filt => filt !== action.payload)
        return {filters: filteredState}
    }
    
    switch (action.type) {
        case GET_ALL:
            if(state.filters.length === 4) {
                return defaultState
            }
            return {...state, filters: ['without', 'one', 'two', 'three']}
        
        case GET_WITHOUT:
            console.log('xax2')
            return {...state, filters: [...state.filters, action.payload]}
        
        // case GET_ONE:
        //     return {...state, filters: [...state.filters, action.payload]}
        
        // case GET_TWO:
        //     return {...state, filters: [...state.filters, action.payload]}
        
        // case GET_THREE:
        //     return {...state, filters: [...state.filters, action.payload]}

        case GET_FILTERED:
            return {...state, filters: [...state.filters, action.payload]}
        
        default: 
            return state
    }
}

export const setFilterAll = () => ({ type: GET_ALL, payload: ['without', 'one', 'two', 'three'] })
export const setFilter = (value) => ({ type: GET_FILTERED, payload: value}) 
export const setFilterWithout = () => ({ type: GET_WITHOUT, payload: 'without' })
// export const setFilterOne = () => ({ type: GET_ONE, payload: 'one' })
// export const setFilterTwo = () => ({ type: GET_TWO, payload: 'two' })
// export const setFilterThree = () => ({ type: GET_THREE, payload: 'three' })
