import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import chatForm from '../../component/chat-form/chat-form';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import '../../index.css';
const RadioItem = Radio.RadioItem;


@connect(
    state => state.user,
    { register }
)
// @chatForm('genius')
class Register extends Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this);
        // this.state = {
        //     user: '',
        //     pwd: '',
        //     repeatpwd: '',
        //     type: 'genius'
        // }
    }

    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val    // key要加[],不然就是字符串,这种语法是ES6的属性名表达式
    //     })
    // }

    // 如果不给高阶传参,需要这样传
    // componentDidMount() {
    //     this.props.handleChange('type', 'genius')
    // }

    handleRegister() {
        this.props.register(this.props.state)
    }

    render() {
        const { type, user, pwd, repeatpwd } = this.props.state;
        const { msg, redirectTo } = this.props;
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo}/> : null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
                        {!user || !pwd ? <div className="error-msg">{msg}</div> : null}
                        <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                        {!user || !pwd ? <div className="error-msg">{msg}</div> : null}
                        <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                        {pwd !== repeatpwd ? <div className="error-msg">{msg}</div> : null}
                        <RadioItem 
                            checked={type === 'genius'}
                            onChange={() => this.props.handleChange('type','genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem 
                            checked={type === 'boss'}
                            onChange={() => this.props.handleChange('type','boss')}
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
// 想给高阶组件传参，就不能用上面这种@用法了
Register = chatForm(Register, 'genius')

export default Register;