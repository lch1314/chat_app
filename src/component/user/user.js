import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, WhiteSpace, List, Button } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state => state.user
)
class User extends Component {
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
                        <Button type="primary" size="small" inline onClick={this.onSubmit}>注销</Button>
                    </Item>
                </List>
            </div>
        ) : null
    }
}


export default User;