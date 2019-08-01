import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@connect(
    state => state.chat
)
@withRouter
class NavLink extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const { pathname } = this.props.location;
        const { unread } = this.props;
        return (
            <div>
               <TabBar>
                   {
                       navList.map(v => (
                           <TabBar.Item
                            title={v.text}
                            key={v.path}
                            badge={v.path === '/msg' ? unread : null}
                            icon={{uri: require(`../navimg/${v.icon}.png`)}}
                            selectedIcon={{ uri: require(`../navimg/${v.icon}-active.png`) }}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                              }}
                           >

                           </TabBar.Item>
                       ))
                   }
               </TabBar>
            </div>
        )
    }
} 

export default NavLink;