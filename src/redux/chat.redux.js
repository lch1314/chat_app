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
        // case MSG_RECV:
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