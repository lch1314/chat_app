import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        // 判断是否是登录或注册路由,如果是的话就不走下面逻辑了
        if(publicList.indexOf(pathname) > -1) {
            return null
        }
        // 获取用户信息
        axios.get('/user/info').then(res => {
            if(res.status === 200) {
                console.log(res.data)
                if(res.data.code === 0) {
                   // 有登录信息

                }else {
                    console.log(111)
                    this.props.history.push('/login')
                }
            }
        })
    }

    render() {
        return null
    }
}

export default AuthRoute;
