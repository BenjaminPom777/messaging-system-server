const INITIAL_STATE = {
    closed:true
}

export const ux = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_NAVS':
            return {...state, closed:!state.closed}        
        default:
            return state;
    }
}