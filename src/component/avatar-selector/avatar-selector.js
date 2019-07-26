import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';
import '../../index.css';

class AvatarSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        }))
        const { text, icon } = this.state;
        const gridHeader = text? (
                                <div>
                                    <span>已选择头像</span>
                                    <img style={{width: 20}} src={icon} alt=''/>
                                </div>) : '请选择头像'
        return (
            <div className="touch-action">
                <List renderHeader={() => gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={4} 
                        isCarousel={true}
                        carouselMaxRow={2} 
                        activeStyle={false} 
                        onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;