import React, { Component } from 'react';
import { connect } from 'react-redux';
import browserCookie from 'browser-cookies';
import { Result, WhiteSpace, List, Button, Modal } from 'antd-mobile';
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state => state.user
)
class User extends Component {
    constructor(props) {
        super(props)
        this.loginout = this.loginout.bind(this)
    }

    loginout() {
        alert('注销', '确认退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid');
                window.location.href = '/login';
            }}
          ])
    }
    render() {
        const { avatar, user, type, company, title, desc, money } = this.props;
        return user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${avatar}.png`)} style={{width: 50}} alt="" />}
                    title={user}
                    message={type === 'boss'? company: null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {title} 
                        {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {money?<Brief>薪资：{money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item>
                        <Button type="primary" size="small" inline onClick={this.loginout}>注销</Button>
                    </Item>
                </List>
            </div>
        ) : null
    }
}


export default User;