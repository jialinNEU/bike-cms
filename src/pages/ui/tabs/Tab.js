import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd';

import './style.less';

export default class Tab extends Component {

  newTabIndex = 0;

  handleCallback = (key) => {
    message.info('Hi，选择了页签：' + key)
  }

  componentWillMount () {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1',
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2',
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3',
      },
    ];
    this.setState({
      activeKey: panes[0].key,
      panes
    });
  }

  // 参数见API
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  // 参数见API
  onChange = (activeKey) => {
    this.setState({
      activeKey
    });
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: activeKey,
      content: 'New Tab Pane',
      key: activeKey,
    });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    // 记录激活哪个Key
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if(pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    // 激活的和要删除的是同一个Tab Key
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <Tabs.TabPane tab="Tab 1" key="1">React课程</Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2" disabled>React课程</Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">React课程</Tabs.TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <Tabs.TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">React课程</Tabs.TabPane>
            <Tabs.TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2" disabled>React课程</Tabs.TabPane>
            <Tabs.TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">React课程</Tabs.TabPane>
          </Tabs>
        </Card>
        <Card title="Tab动态页签" className="card-wrap">
          <Tabs
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
            onChange={this.onChange}
          >
            {
              this.state.panes.map((panel) => {
                return <Tabs.TabPane 
                  tab={panel.title}
                  key={panel.key}
                />
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}