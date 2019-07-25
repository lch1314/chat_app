import axios from "axios";
import { REGISTER_SUCCESS, ERROR_MSG, LOGIN_SUCCESS, LOAD_DATA } from './constants';
import { getRedirectPath } from '../utils';

const initState = {
    msg: '',
    isAuth: false,
    user: '',
    type: 'genius',
    redirectTo: ''
}

// reducer
export function user(state=initState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}


// action
function errorMsg(msg) {
    return {
        type: ERROR_MSG,
        msg
    }
}

function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export function loadData(userinfo) {
   return {
       type: LOAD_DATA,
       payload: userinfo
   }
}

export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                const action = loginSuccess(res.data.data);
                dispatch(action)
            }else {
                const action = errorMsg(res.data.msg);
                dispatch(action)
            }
        }).catch(() => {
            console.log('error')
        })
    }
    
}

// 这个register其实也是一个action,只不过这个action返回的不是对象而是一个函数，当外面dispatch它的时候，它里面返回的这个函数会自动执行从而调接口
export function register({user, pwd, repeatpwd, type}) {
    if(!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatpwd) {
        return errorMsg('密码和确认密码必须一致')
    }
    // 没有用redux-thunk这里返回的一定是对象，用了之后这里可以返回一个函数
    return dispatch => {
        axios.post('/user/register', {user, pwd, repeatpwd, type}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                const action = registerSuccess({user, pwd, repeatpwd, type});
                dispatch(action)
            }else {
                const action = errorMsg(res.data.msg);
                dispatch(action)
            }
        }).catch(() => {
            console.log('error')
        })
    }
}