import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@connect(
    state => state
)
@withRouter
class NavLink extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        console.log(this.props)
        const navList = this.props.data.filter(v => !v.hide);
        console.log(navList)
        const { pathname } = this.props.location;
        return (
            <div>
               <TabBar>
                   {
                       navList.map(v => (
                           <TabBar.Item
                            title={v.text}
                            key={v.path}
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