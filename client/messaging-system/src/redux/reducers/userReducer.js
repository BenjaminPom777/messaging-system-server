import {
    LOGIN, LOGIN_FAIL, LOGIN_START,
    REGISTER, REGISTER_FAIL, REGISTER_START,
    GET_USER_INFO, GET_USER_INFO_START, GET_USER_INFO_FAIL,
    LOGOUT, LOGOUT_FAIL, LOGOUT_START,
    CLEAR_LOGIN_MESSAGES
} from './../actions/userActions';

const INITIAL_STATE = {
    userId: null,
    email: '',
    isLogedIn: false,
    isFetching: false,
    errorMessage: '',
    successMessage: ''
}

export const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_LOGIN_MESSAGES:
            return {...state,errorMessage: '', successMessage: ''}
        case LOGIN_START:
            return { ...state, isFetching: true, errorMessage: null, successMessage: '' }
        case LOGIN_FAIL:
            if (action.payload.response && action.payload.response.data) {
                return { ...state, errorMessage: action.payload.response.data, isFetching: false }
            }
            return { ...state, isFetching: false }
        case LOGIN:
            if (action.payload.email && action.payload.id) {
                return { ...state, email: action.payload.email, userId: action.payload.id, isLogedIn: true, isFetching: false }
            }
            return { ...state, isLogedIn: false, isFetching: false }

        case REGISTER_START:
            return { ...state, isFetching: true, errorMessage: null, successMessage: '' }
        case REGISTER_FAIL:
            if (action.payload.response && action.payload.response.data) {
                return { ...state, isFetching: false, errorMessage: action.payload.response.data }
            }
            return { ...state, isFetching: false }
        case REGISTER:
            if (action.payload) {
                return { ...state, isFetching: false, successMessage: 'Register success' }
            }
            return { ...state, isFetching: false }

        case LOGOUT_START:
            return { ...state, isFetching: true }
        case LOGOUT_FAIL:
            return { ...state, isFetching: false }
        case LOGOUT:
            return { ...state, isLogedIn: false, isFetching: false, email: '', userId: null }

        case GET_USER_INFO_START:
            return { ...state, isFetching: true }
        case GET_USER_INFO_FAIL:
            return { ...state, isFetching: false }
        case GET_USER_INFO:
            if (action.payload.email && action.payload.id) {
                return { ...state, email: action.payload.email, userId: action.payload.id, isLogedIn: true, isFetching: false }
            }
            return { ...state, isLogedIn: false, isFetching: false }



        default:
            return state;
    }
}


