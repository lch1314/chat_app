import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import { Card } from 'antd-mobile';

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.getUserList('genius')
    }

    render () {
        return (
            <div>
                {
                    this.props.userlist.map(v => (
                        v.avatar ? <Card key={v._id}>
                           <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                <div>{v.desc.split('\n').map(v => (
                                    <div key={v}>{v}</div>
                                ))}</div>
                            </Card.Body>
                        </Card> : null
                    ))
                }
            </div>
        )
    }
}

export default Boss;