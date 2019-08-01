import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { sendMsg, getMsgList, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../utils';
const Item = List.Item;


@connect(
    state => state,
    { sendMsg, getMsgList, recvMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = { 
            text: ''
        }
    }
    componentDidMount() {
        // 如果长度为0，表示没有聊天记录
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg()
        }
    }

    handleSumbit() {
        // 当前登录的这个人的id
        const from = this.props.user._id;
        // 点击想要聊天的这个人的id
        const to = this.props.match.params.id;
        // 输入框输入的聊天内容
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg})
        // 输入完之后情况聊天框
        this.setState({text: ''})
    }
    render() {
        const { chat, user } = this.props;
        const { users, chatmsg } = chat;
        const { _id } = user;
        const { id } = this.props.match.params;
        // id代表点击的这个人的id    _id代表当前登录用户的id
        const currentChatid = getChatId(id, _id);
        // console.log(chatmsg.filter(v => v.chatid === currentChatid))
        if(!users[id]) {
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                       this.props.history.goBack() 
                    }}
                >
                    {users[id].name}
                </NavBar>
                {
                    chatmsg.filter(v => v.chatid === currentChatid).map(v => {
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return v.from === id? (
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >
                                    {v.content}
                                </Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item 
                                    extra={<img src={avatar} alt=''/>}
                                    className='chat-me'
                                >
                                    {v.content}
                                </Item>
                            </List>
                        )
                    })
                }
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={() => this.handleSumbit()}>发送</span>}
                        >
                            信息
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;