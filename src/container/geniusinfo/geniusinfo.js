import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.selectAvatar = this.selectAvatar.bind(this)
        this.state = {
            title: '',
            desc: ''
        }
    }

    handleJob(key, val) {
        this.setState({
            [key]: val
        })
    }

    selectAvatar(imgname) {
        this.setState({
            avatar: imgname
        })
    }

    render() {
        const { redirectTo, update } = this.props;
        const path = this.props.location.pathname;

        return (
            <div>
                {redirectTo && redirectTo!==path? <Redirect to={redirectTo}></Redirect> : null}
                <NavBar mode="dark">牛人信息完善页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem
                    onChange={v => this.handleJob('title', v)}
                >求职岗位</InputItem>
                <TextareaItem
                    title="个人简介"
                    rows={3}
                    autoHeight
                    onChange={v => this.handleJob('desc', v)}
                />
                <WhiteSpace size="lg"/>
                <Button type="primary" onClick={() => update(this.state)}>保存</Button>
                
            </div>
        )
    }
}


export default GeniusInfo;