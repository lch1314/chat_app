import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLink from '../navlink/navlink';
import { Route } from 'react-router-dom';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import Msg from '../msg/msg';
import { getMsgList, recvMsg } from '../../redux/chat.redux';
import QueueAnim from 'rc-queue-anim';

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class Dashboard extends Component {
    // 进入dashboard就需要获取消息数
    componentDidMount () {
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg()
        }
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
        const page = navList.find(v => v.path === pathname);
        return (
            <div>
                <NavBar className="fixed-header" mode="dark"
                >{page.title}</NavBar>
                <div>
                    {/* 不能这样用，要想动画生效，必须只渲染一个Route, 根据当前的path决定组件 */}
                    {/* <QueueAnim type={'scaleX'} duration={800}>
                        <Switch>
                            {
                                navList.map(v => (
                                    <Route key={v.path} path={v.path} component={v.component}></Route>
                                ))
                            }
                        </Switch>
                    </QueueAnim> */}
                    <QueueAnim type={'scaleX'} duration={800}>
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                <NavLink data={navList}></NavLink>
            </div>
        )
    }
} 

export default Dashboard;