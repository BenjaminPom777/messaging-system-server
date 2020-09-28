
export const GET_MESSAGES_FAIL = 'GET_MESSAGES_FAIL';
export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_MESSAGES_START = 'GET_MESSAGES_START';
export const getMessages=(payload)=>{
    return {
        type:GET_MESSAGES_START,
        payload
    }
}

export const POST_MESSAGE_FAIL = 'POST_MESSAGE_FAIL';
export const POST_MESSAGE = 'POST_MESSAGE';
export const POST_MESSAGE_START = 'POST_MESSAGE_START';
export const postMessage=(payload)=>{
    return {
        type:POST_MESSAGE_START,
        payload
    }
}


export const DELETE_MESSAGE_FAIL = 'DELETE_MESSAGE_FAIL';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_MESSAGE_START = 'DELETE_MESSAGE_START';
export const deleteMessage=(payload)=>{
    return {
        type:DELETE_MESSAGE_START,
        payload
    }
}
