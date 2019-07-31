import React, { Component } from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList } from '../../redux/chat.redux';
// // 由于是跨域，需要手动连接到9093
const socket = io('ws://localhost:9093');


@connect(
    state => state,
    { getMsgList }
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        // socket.on('recvmsg', (data) => {
        //     console.log(data)
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        this.props.getMsgList()
    }

    handleSumbit() {
       console.log(this.state) 
       // 从前端发送消息给后端
       socket.emit('sendmsg', {text: this.state.text})
       // 清空输入框
       this.setState({text: ''})
    }
    render() {
        return (
            <div>
                {
                    this.state.msg.map(v => (
                        <p key={v}>{v}</p>
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