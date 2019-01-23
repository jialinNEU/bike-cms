import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/action';

import MenuConfig from './../../config/menuConfig';
import './style.less';

class NavLeft extends Component {
  state = {
    currentKey: ''
  };
  
  componentWillMount () {
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
    this.setState({
      menuTreeNode,
      currentKey
    });
  }

  // 点击事件修改currentKey值
  handleClick = (item) => {
    // connect关联后具有的this.props.dispatch
    const { dispatch } = this.props;
    dispatch(switchMenu(item.item.props.title));
    this.setState({
      currentKey: item.key
    });
  }

  // 递归渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Bike CMS</h1>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.currentKey]}
          theme="dark"
        >
          { this.state.menuTreeNode }
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);