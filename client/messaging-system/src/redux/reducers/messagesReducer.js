import {
    GET_MESSAGES, GET_MESSAGES_START, GET_MESSAGES_FAIL,
    POST_MESSAGE,POST_MESSAGE_FAIL,POST_MESSAGE_START,
    DELETE_MESSAGE,DELETE_MESSAGE_FAIL,DELETE_MESSAGE_START
} from './../actions/messagesActions'

const INITIAL_STATE = {
    messages: [],
    isFetching: false
}

export const messages = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_MESSAGE_START:
            return { ...state, isFetching: true }
        case POST_MESSAGE:
            return { ...state, isFetching: false }        

        case DELETE_MESSAGE:
            return {...state, isFetching: false, messages:action.payload}
        case DELETE_MESSAGE_START:
            return  {...state, isFetching: true}

        case GET_MESSAGES_START:
            return { ...state, isFetching: true }
        case GET_MESSAGES:
            return { ...state, messages: action.payload, isFetching: false }
        default:
            return state;
    }

}


