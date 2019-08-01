import axios from 'axios';
import { MSG_LIST, MSG_RECV, MSG_READ } from './constants';
import io from 'socket.io-client';
// 由于是跨域，需要手动连接到9093
const socket = io('ws://localhost:9093');
const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}


export function chat(state=initState, action) {
    switch(action.type) {
        case MSG_LIST:
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length}
        case MSG_RECV:
            // 未读消息只统计别人发过来的，自己发过去的不统计
            const n = action.payload.to === action.userid ? 1 : 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread+n}
        // case MSG_READ:
        default:
            return state
    }
}


function msgList(msgs, users, userid) {
    return {
        type: MSG_LIST,
        payload: {msgs, users, userid}
    }
}


export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(res => {
            if(res.status === 200 && res.data.code === 0) {
                console.log(getState())
                const userid = getState().user._id;   // 当前登录用户的id
                const action = msgList(res.data.msgs, res.data.users, userid);
                dispatch(action)
            }
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

function msgRecv(msg, userid) {
    return {
        type: MSG_RECV,
        payload: msg,
        userid
    }
}

// 监听全局消息
export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function(data) {
            console.log(data)
            const userid = getState().user._id;   // 当前登录用户的id
            const action = msgRecv(data._doc, userid)
            dispatch(action)
        })
    }
}