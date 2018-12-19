import React, { Component } from 'react'
import { Card, Button, notification } from 'antd';

import './style.less';

export default class Notifications extends Component {

  openNotification = (type, direction) => {
    if (direction) {
      notification.config({
        // 弹出位置
        placement: direction
      });
    }
    notification[type]({
      message: 'React',
      description: '学习React AntD',
    })
  }

  render() {
    return (
      <div>
        <Card title="通知提醒框1" className="card-wrap">
          <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框2" className="card-wrap">
          <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
        </Card>
      </div>
    )
  }
}