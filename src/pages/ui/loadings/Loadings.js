import React, { Component } from 'react'
import { Card, Spin, Icon, Alert } from 'antd';

import './style.less';

export default class Buttons extends Component {

  render() {
    const icon = <Icon type="loading" style={{fontSize: 24}} />;
    const icon2 = <Icon type="plus" style={{fontSize: 24}} />;
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small" />
          <Spin style={{margin: '0 10px'}} />
          <Spin size="large" />
          <Spin indicator={icon} style={{marginLeft: 10}} />
          <Spin indicator={icon2} style={{marginLeft: 10}} spinning={true} />
        </Card>

        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="React"
            description="欢迎来到React AntD"
            type="info"
          >
          </Alert>
          <Spin>
            <Alert
              message="React"
              description="欢迎来到React AntD"
              type="warning"
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
              message="React"
              description="欢迎来到React AntD"
              type="warning"
            />
          </Spin>
        </Card>
      </div>
    )
  }
}