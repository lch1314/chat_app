import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


@connect(
    state => state
)
class Msg extends Component {
    getLast(arr) {
        return arr[arr.length-1]
    }
    render() {
        console.log(this.props)
        const userid = this.props.user._id;
        const {users} = this.props.chat;
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v)
        })
        // 最新消息排序
        const chatList = Object.values(msgGroup).sort((a,b) => {
            const a_last = this.getLast(a).createTime;
            const b_last = this.getLast(b).createTime;
            return b_last - a_last;
        })
        console.log(chatList)

        // 按照聊天用户分组，根据chatid
        return (
            <div>
                <List>
                    {
                       chatList.map(v => {
                           const lastItem = this.getLast(v);
                           const targetId = v[0].from === userid ? v[0].to : v[0].from;
                           const unreadNum = v.filter(v => !v.read && v.to === userid).length;
                           return (
                            <Item
                                key={lastItem._id}
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${users[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                               <Brief>{users[targetId] && users[targetId].name}</Brief> 
                            </Item>
                           )
                       }) 
                    }
                </List>
            </div>
        )
    }
}

export default Msg;