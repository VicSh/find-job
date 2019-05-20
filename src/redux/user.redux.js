import axios from "axios";
import { getRedirectPath } from "../util";

const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: '',
  avatar: ''
};

export function user(state = initState, action) {
  switch(action.type) {
    case ERROR_MSG:
      return {...state, msg: action.msg};
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), ...action.data};
    case LOAD_DATA:
      return {...state, ...action.data}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state;
  }
}

function errorMsg(msg) {
  return {
    msg, 
    type: ERROR_MSG
  }
}

function authSuccess ({pwd, ...data}) {
  return {
    data, 
    type: AUTH_SUCCESS
  }
}

export function loadData (data) {
  return {
    data,
    type: LOAD_DATA
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}

export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入');
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次输入密码不一致');
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入');
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}

export function logoutSubmit() {
  return {
    type: LOGOUT
  }
}