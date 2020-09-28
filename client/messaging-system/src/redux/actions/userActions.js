

export const SET_NAME = "SET_NAME"
export const setNameStart = (payload) => {
  return {
    type: SET_NAME,
    payload: payload
  }
}


export const REGISTER_START = "REGISTER_START"
export const REGISTER_FAIL = "REGISTER_FAIL"
export const REGISTER = "REGISTER"
export const userRegister = (payload) => {
  return {
    type: REGISTER_START,
    payload: payload
  }
}


export const LOGIN_START = "LOGIN_START"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGIN = "LOGIN"
export const userLogin = (payload) => {
  return {
    type: LOGIN_START,
    payload: payload
  }
}

export const LOGOUT_START = "LOGOUT_START"
export const LOGOUT_FAIL = "LOGOUT_FAIL"
export const LOGOUT = "LOGOUT"
export const userLogout = (payload) => {
  return {
    type: LOGOUT_START,
    payload: payload
  }
}


export const GET_USER_INFO_START = "GET_USER_INFO_START"
export const GET_USER_INFO_FAIL = "GET_USER_INFO_FAIL"
export const GET_USER_INFO = "GET_USER_INFO"
export const getUserInfo = (payload) => {
  return {
    type: GET_USER_INFO_START,
    payload: payload
  }
}
