import React, { Component } from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
const RadioItem = Radio.RadioItem;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius'
        }
    }
    render() {
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <InputItem>密码</InputItem>
                        <InputItem>确认密码</InputItem>
                        <RadioItem checked={this.state.type === 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type === 'boss'}>
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;