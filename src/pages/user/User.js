import React, { Component } from 'react';
import { Card, Button, Modal, Form, Radio, Select, Input, Icon, Checkbox, DatePicker, message,  } from 'antd';
import moment from 'moment';

import Axios from './../../axios/index';
import Utils from './../../utils/utils';
import { BaseTable } from './../../components/BaseTable';
import { BaseForm } from './../../components/BaseForm';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class User extends Component {
  
  state = {
    list: [],
  };

  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名',
      width: 100,
    },
    {
      type: 'INPUT',
      label: '手机号',
      field: 'user_mobile',
      placeholder: '请输入用户手机号',
      width: 100,
    },
    {
      type: 'INPUT',
      label: '请选择入职日期',
      field: 'user_date',
      placeholder: '请选择日期'
    }
  ]

  componentDidMount () {
    this.requestList();
  }

  requestList = () => {
    Axios.ajax({
      url: '/user/list',
      data: {
        params: this.params,
      },
    }).then((res) => {
      let self = this;
      let list = res.result.list.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list,
        pagination: Utils.pagination(res, (current) => {
          self.params.page = current;
          self.requestList();
        }),
      });
    });
  }

  handleFormSubmit = (params) => {
    this.params = params;
    this.requestList();
  }

  handleOperate = (type) => {
    let item = this.state.selectedItem;
    if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      });
    } else if (type === 'edit' || type === 'detail') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        });
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item,
      });
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户',
        });
        return;
      }
      Modal.confirm({
        title: '确认删除',
        onOk() {
          Axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then((res) => {
            if(res.code === 0) {
              this.setState({
                isVisible: false
              });
              this.requestList();
            }
          })
        }
      });
    }
  }

  // 创建员工提交
  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldValues();
    Axios.ajax({
      url: type === 'create' ? '/user/create' : '/user/edit',
      data: {
        params: data
      }
    }).then((res) => {
      if(res.code === 0) {
        this.setState({
          isVisible: false,
        });
        this.requestList();
      }
    });
  }

  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return {
            '1': '状态1',
            '2': '状态2',
            '3': '状态3',
            '4': '状态4',
            '5': '状态5',
          }[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        render(hobby) {
          return {
            '1': '爱好1',
            '2': '爱好2',
            '3': '爱好3',
            '4': '爱好4',
            '5': '爱好5',
            '6': '爱好6',
            '7': '爱好7',
            '8': '爱好8',
          }[hobby];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
    ];
    let footer = {};
    if (this.state.type === 'detail') {
      footer = { footer: null };
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit} />
        </Card>
        <Card style={{ marginTop: 10 }} className="operate-wrap">
          <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" icon="info" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <BaseTable
            // 当选中某一行时，会触发updateSelectedItem方法
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            // selectedIds={this.state.selectedIds}
            // rowSelection="checkbox"
          />
        </div>
        <Modal
          width={600}
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            // 清空表单内容
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false
            });
          }}
          {...footer}
        >
          <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm=inst} />
        </Modal>
      </div>
    );
  }
}


class UserForm extends Component {
  render () {
    const { getFieldDecorator } = this.props.form;
    const type = this.props.type;
    const userInfo = this.props.userInfo || {};
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      },
    };

    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {
            userInfo && type==='detail' ?
            userInfo.username :
            getFieldDecorator('user_name', {
              initialValue: userInfo.username
            })(
              <Input type="text" placeholder="请输入姓名" />
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            userInfo && type==='detail' ?
            userInfo.sex === 1 ? '男':'女' :
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            userInfo && type==='detail' ?
            userInfo.state :
            getFieldDecorator('state', {
              initialValue: userInfo.state
            })(
              <Select>
                <Option value={1}>状态1</Option>
                <Option value={2}>状态2</Option>
                <Option value={3}>状态3</Option>
                <Option value={4}>状态4</Option>
                <Option value={5}>状态5</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            userInfo && type==='detail' ?
            userInfo.birthday :
            getFieldDecorator('birthday', {
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker showTime={true} />
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            userInfo && type==='detail' ?
            userInfo.address :
            getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <Input.TextArea rows={3} placeholder="请输入联系地址" />
            )
          }
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create({})(UserForm)
