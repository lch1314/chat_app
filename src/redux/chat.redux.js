import axios from 'axios';
import { MSG_LIST, MSG_RECV, MSG_READ } from './constants';
import io from 'socket.io-client';
// 由于是跨域，需要手动连接到9093
const socket = io('ws://localhost:9093');
const initState = {
    chatmsg: [],
    unread: 0
}


export function chat(state=initState, action) {
    switch(action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length}
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread+1}
        // case MSG_READ:
        default:
            return state
    }
}


function msgList(msgs) {
    return {
        type: MSG_LIST,
        payload: msgs
    }
}


export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist').then(res => {
            if(res.status === 200 && res.data.code === 0) {
                const action = msgList(res.data.msgs);
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

function msgRecv(msg) {
    return {
        type: MSG_RECV,
        payload: msg
    }
}

// 监听全局消息
export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function(data) {
            console.log(data)
            const action = msgRecv(data._doc)
            dispatch(action)
        })
    }
}