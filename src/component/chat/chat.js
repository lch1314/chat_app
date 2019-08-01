import React, { Component } from 'react';
import { List, InputItem, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
const Item = List.Item;


@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
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
        this.props.getMsgList();
        this.props.recvMsg()
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
        const { chat } = this.props;
        const { id } = this.props.match.params
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {id}
                </NavBar>
                {
                    chat.chatmsg.map(v => (
                        v.from === id? (
                            <List key={v._id}>
                                <Item
                                    // thumb={}
                                >
                                    {v.content}
                                </Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item 
                                    extra={'avatar'}
                                    className='chat-me'
                                >
                                    {v.content}
                                </Item>
                            </List>
                        )
                    ))
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