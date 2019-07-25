import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import '../../index.css';
const RadioItem = Radio.RadioItem;


@connect(
    state => state.user,
    { register }
)
class Register extends Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val    // key要加[],不然就是字符串,这种语法是ES6的属性名表达式
        })
    }

    handleRegister() {
        console.log(this.state)
        this.props.register(this.state)
    }

    render() {
        const { type, user, pwd, repeatpwd } = this.state;
        const { msg } = this.props;
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                        {!user || !pwd ? <div className="error-msg">{msg}</div> : null}
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                        {!user || !pwd ? <div className="error-msg">{msg}</div> : null}
                        <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                        {pwd !== repeatpwd ? <div className="error-msg">{msg}</div> : null}
                        <RadioItem 
                            checked={type === 'genius'}
                            onChange={() => this.handleChange('type','genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem 
                            checked={type === 'boss'}
                            onChange={() => this.handleChange('type','boss')}
                        >
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;