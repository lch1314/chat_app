import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Card } from 'antd-mobile';

class UserCard extends Component {
    static propTypes = {
        userlist: propTypes.array.isRequired
    }

    render() {
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
                                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                <div>
                                    {v.desc.split('\n').map(d => (
                                        <div key={d}>工作要求：{d}</div>
                                    ))}
                                </div>
                                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                            </Card.Body>
                        </Card> : null
                    ))
                }
            </div>
        )
    }
}


export default UserCard;