import React, { Component } from 'react'
import { Card, Button, message } from 'antd';

import './style.less';

export default class Messages extends Component {

  showMessage = (type) => {
    message[type]('React AntD学习成功');
  }

  render() {
    return (
      <div>
        <Card title="全局提示框" className="card-wrap">
          <Button type="primary" onClick={() => this.showMessage('success')}>Success</Button>
          <Button type="primary" onClick={() => this.showMessage('info')}>Info</Button>
          <Button type="primary" onClick={() => this.showMessage('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.showMessage('error')}>Error</Button>
        </Card>
      </div>
    )
  }
}