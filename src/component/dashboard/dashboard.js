import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLink from '../navlink/navlink';

@connect(
    state => state
)
class Dashboard extends Component {

    render() {
        const { user } = this.props;
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                // component: Boss,
                hide: user.type === 'genius'   // boss路由下显示牛人列表
            },
            {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                // component: Genius,
                hide: user.type === 'boss'    // 牛人路由下显示boss列表
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                // component: Msg
            },
            {
                path: '/me',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                // component: User
            }
        ]
        return (
            <div>
                <NavBar mode="dark"
                >{navList.find(v => v.path === pathname).title}</NavBar>
                <div>content</div>
                <NavLink data={navList}></NavLink>
            </div>
        )
    }
} 

export default Dashboard;