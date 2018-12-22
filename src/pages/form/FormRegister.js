import React, { Component } from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch } from 'antd';
import { DatePicker, TimePicker, Upload, Icon, message, InputNumber } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class FormRegister extends Component {

  state = {};

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    console.log(userInfo);
    message.success(`Congratulation, ${userInfo.username}! 注册成功`);
  }

  handleChange = (info) => {
    // file为当前操作的文件对象
    // status有：uploading, done, error, removed
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // 从Response中获取url
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }));
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      // label标签布局，同 <Col> 组件
      labelCol: {
        // 总长是24
        xs: 24,
        sm: 4,
      },
      // 为Input控件设置布局样式
      wrapperCol: {
        xs: 24,
        sm: 12,
      },
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4,
        },
      },
    };
    const textAreaRowObject = {
      minRows: 4,
      maxRows: 6,
    };

    return (
      <div>
        <Card title="注册表单">
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空',
                    },
                  ],
                })(
                  <Input placeholder="请输入用户名" />
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                })(
                  <Input type="password" placeholder="请输入密码" />
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1',
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18,
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2',
                })(
                  <Select>
                    <Option value="1">React</Option>
                    <Option value="2">Vue</Option>
                    <Option value="3">Angular</Option>
                    <Option value="4">FE</Option>
                    <Option value="5">BE</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('hobby', {
                  initialValue: ['2', '5'],
                })(
                  <Select mode="multiple">
                    <Option value="1">游泳</Option>
                    <Option value="2">打篮球</Option>
                    <Option value="3">踢足球</Option>
                    <Option value="4">跑步</Option>
                    <Option value="5">爬山</Option>
                    <Option value="6">骑行</Option>
                    <Option value="7">桌球</Option>
                    <Option value="8">麦霸</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  // 子节点的属性, 即Switch的值是checked
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('1993-11-23'),
                })(
                  <DatePicker 
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '16 Island Hill Ave #208, Melrose, MA 02176',
                })(
                  <TextArea 
                    autosize={textAreaRowObject}
                  />
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker />
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('avatar')(
                  <Upload
                    // 上传列表的内建样式
                    listType="picture-card"
                    // 是否展示uploadList
                    showUploadList={false}
                    // 上传地址
                    action="//jsonplaceholder.typicode.com/posts/"
                    // 上传文件改变时的状态
                    onChange={this.handleChange}
                  >
                    {this.state.userImg?<img src={this.state.userImg} alt="img" />:<Icon type="plus" />}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                  <Checkbox>我已阅读过<a href="#/admin/form/reg">协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister);
