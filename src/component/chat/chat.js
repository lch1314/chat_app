import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon, Grid  } from 'antd-mobile';
import { connect } from 'react-redux';
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../utils';
const Item = List.Item;

@connect(
    state => state,
    { sendMsg, getMsgList, recvMsg, readMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = { 
            text: '',
            showEmoji: false
        }
    }
    componentDidMount() {
        // 如果长度为0，表示没有聊天记录
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg()
        }
        this.fixCarousel()
    }

    // 用户离开这个路由，当前组件就会被销毁，走这个钩子函数
    componentWillUnmount() {
        // 标记是和谁聊天
        const to = this.props.match.params.id;
        this.props.readMsg(to)
    }

    // 解决emoji标签撑不开的bug
    fixCarousel() {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSumbit() {
        // 当前登录的这个人的id
        const from = this.props.user._id;
        // 点击想要聊天的这个人的id
        const to = this.props.match.params.id;
        // 输入框输入的聊天内容
        const msg = this.state.text.trim();
        if(msg) {
            this.props.sendMsg({from, to, msg})
        }
        // 输入完之后情况聊天框
        this.setState({
            text: '',
            showEmoji: false
        })
    }
    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 😰 🤩 😘 😗 😚 😛 😪 😏 😭 😥 😲 ☹️ 😱 😕 😈 😸 💋 👌 🤞 👋 🤚 🖖 🤟 🤘 🖕 👍 👇 👎 🙏 💪 💀 👾 😽 😿 🙌'
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}))
        const { showEmoji, text } = this.state;
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
                            extra={
                                <div>
                                    <span role="img" aria-label="Description of the overall image" style={{marginRight: 15}} onClick={() => {
                                        this.setState({
                                            showEmoji: !showEmoji
                                        })
                                        this.fixCarousel()
                                    }}>😀</span>
                                    <span onClick={() => this.handleSumbit()}>发送</span>
                                </div>
                            }
                        >
                            信息
                        </InputItem>
                    </List>
                    {
                        showEmoji?<Grid 
                            className="touch-action"
                            data={emoji}  
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: text + el.text
                                })
                            }}
                        /> : null
                    }
                    
                </div>
            </div>
        )
    }
}

export default Chat;