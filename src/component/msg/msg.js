import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect(
    state => state
)
class Msg extends Component {
    
    render() {
        console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v)
        })
        // 按照聊天用户分组，根据chatid
        return (
            <h1>消息列表11111</h1>
        )
    }
}

export default Msg;