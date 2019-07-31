import React, { Component } from 'react';

// 高阶组件
export default function chatForm(Comp, initValue) {
    return class WrapperComp extends Component {
        constructor(props) {
            super(props)
            this.state = {
                type: initValue
            }
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key, val) {
            this.setState({
                [key]: val    // key要加[],不然就是字符串,这种语法是ES6的属性名表达式
            })
        }
        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}