import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';

import MenuConfig from './../../config/menuConfig';
import './style.less';

export default class NavLeft extends Component {
  
  componentWillMount () {
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
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
          theme="dark"
        >
          { this.state.menuTreeNode }
        </Menu>
      </div>
    );
  }
}
