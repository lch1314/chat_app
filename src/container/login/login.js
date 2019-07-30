import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { login } from '../../redux/user.redux';

@connect(
    state => state.user,
    { login }
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            user: '',
            pwd: ''
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val    // key要加[],不然就是字符串,这种语法是ES6的属性名表达式
        })
    }

    handleLogin() {
        this.props.login(this.state)
    }

    register() {
        this.props.history.push('/register')
    }

    render() {
        const { redirectTo } = this.props;
        return (
            <div>
                {redirectTo && redirectTo!== '/login' ? <Redirect to={redirectTo}/> : null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem> 
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem> 
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;