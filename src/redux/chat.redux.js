import axios from 'axios'
import io from 'socket.io-client' 
const socket = io('ws://localhost:9099')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.data.msgs, unread: action.data.msgs.filter(v => !v.read&&v.to === action.data.userid).length, users: action.data.users}
    case MSG_RECV:
      const unread = action.data.to === action.userid ? ++state.unread : state.unread
      return {...state, chatmsg: [...state.chatmsg, action.data], unread}
    case MSG_READ:
      const {from, num} = action.data
      return {...state, chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})), unread: state.unread - num}
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return {
    type: MSG_LIST,
    data: {msgs, users, userid}
  }
}

function msgRecv(data, userid) {
  return {
    userid,
    data,
    type: MSG_RECV,
  }
}

function msgRead({from, to, num}) {
  return {
    type: MSG_READ,
    data: {from, to, num}
  }
}

export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then(res => {
      if (res.status ===200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
      }
    })
  }
}

export function sendMsg (data) {
  return dispatch => {
    socket.emit('sendmsg', data)
  }
}

export function recvMsg () {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function readMsg (from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from}).then(res => {
      const userid = getState().user._id
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead({userid, from, num: res.data.num}))
      }
    })
  }
}