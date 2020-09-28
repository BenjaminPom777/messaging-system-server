import {
    GET_MESSAGES, GET_MESSAGES_START, GET_MESSAGES_FAIL,
    POST_MESSAGE, POST_MESSAGE_FAIL, POST_MESSAGE_START,
    DELETE_MESSAGE, DELETE_MESSAGE_FAIL, DELETE_MESSAGE_START,
    CLEAR_MESSAGES_NOTIFICATIONS
} from './../actions/messagesActions'

const INITIAL_STATE = {
    messages: [],
    isFetching: false,
    notification: ''
}

export const messages = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_MESSAGES_NOTIFICATIONS:
            return { ...state, notification: '' }
        case POST_MESSAGE_START:
            return { ...state, isFetching: true, notification: '' }
        case POST_MESSAGE:
            return { ...state, isFetching: false, notification: 'Success' }
        case POST_MESSAGE_FAIL:
            return { ...state, isFetching: false, notification: 'Failed to send message' }
        case DELETE_MESSAGE_START:
            return { ...state, isFetching: true }
        case DELETE_MESSAGE:
            return { ...state, isFetching: false, messages: action.payload }
        case DELETE_MESSAGE_FAIL:
            return { ...state, isFetching: false }

        case GET_MESSAGES_START:
            return { ...state, isFetching: true, notification: '' }
        case GET_MESSAGES:
            return { ...state, messages: action.payload, isFetching: false }
        case GET_MESSAGES_FAIL:
            return { ...state, isFetching: false }
        default:
            return state;
    }

}


