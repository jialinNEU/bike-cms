import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';

class FormLogin extends Component {

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`Congratulation ${userInfo.username}!`);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">登录</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{marginTop: 10}}>
          <Form style={{width: 300}}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空',
                    },
                    {
                      min: 5, 
                      max: 10,
                      message: '长度不在范围内',
                    },
                    {
                      pattern: new RegExp('^\\w+$', 'g'),
                      message: '用户名必须为字母或数字',
                    },
                  ],
                })(
                  <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [],
                })(
                  <Input prefix={<Icon type="lock" />} placeholder="请输入密码" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  // 子节点的属性值
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#/admin" style={{float: 'right'}}>忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

// 包裹Form组件，继而可以使用getFieldDecorator
export default Form.create()(FormLogin);