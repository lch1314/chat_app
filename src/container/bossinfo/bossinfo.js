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
class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.selectAvatar = this.selectAvatar.bind(this)
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
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
                <NavBar mode="dark">Boss信息完善页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem
                    onChange={v => this.handleJob('title', v)}
                >招聘职位</InputItem>
                <InputItem
                    onChange={v => this.handleJob('company', v)}
                >公司名称</InputItem>
                <InputItem
                    onChange={v => this.handleJob('money', v)}
                >职位薪资</InputItem>
                <TextareaItem
                    title="职位要求"
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

export default BossInfo;