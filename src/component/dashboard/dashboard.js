import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLink from '../navlink/navlink';
import { Switch, Route } from 'react-router-dom';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import { getMsgList, recvMsg } from '../../redux/chat.redux';

function Msg() {
    return (
        <h1>Msg</h1>
    )
}

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class Dashboard extends Component {
    // 进入dashboard就需要获取消息数
    componentDidMount () {
        this.props.getMsgList();
        this.props.recvMsg()
    }
    render() {
        const { user } = this.props;
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'   // boss路由下显示牛人列表
            },
            {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'    // 牛人路由下显示boss列表
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>
                <NavBar className="fixed-header" mode="dark"
                >{navList.find(v => v.path === pathname).title}</NavBar>
                <div>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLink data={navList}></NavLink>
            </div>
        )
    }
} 

export default Dashboard;