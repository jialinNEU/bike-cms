import React, { Component } from 'react';
import { Card, Button, Modal, Form, Select, Tree, Input, Transfer } from 'antd';

import Utils from './../../utils/utils';
import Axios from './../../axios';
import menuConfig from './../../config/menuConfig';
import { BaseTable } from '../../components/BaseTable'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class Permission extends Component {
  
  state = {};

  componentWillMount () {
    this.requestList();
  }

  requestList = () => {
    Axios.ajax({
      url: '/role/list',
      data: {
        params: {}
      },
    }).then((res) => {
      if(res.code === 0) {
        let list = res.result.item_list.map((item, i) => {
          item.key = i;
          return item;
        });
        this.setState({ list });
      }
    });
  }

  // 角色创建
  handleRole = () => {
    this.setState({
      isRoleVisible: true
    });
  }

  // 角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    Axios.ajax({
      url: 'role/create',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if(res) {
        this.setState({
          isRoleVisible: false
        });
        this.roleForm.props.form.resetFields();
        this.requestList();
      }
    });
  }

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      });
      return;
    }
    this.setState({
      isPermissionVisible: true,
      detailInfo: this.state.selectedItem,
      menuInfo: this.state.selectedItem.menus
    });
  }

  // 提交权限
  handlePermissionEdieSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue();
    console.log(data);
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    Axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      this.setState({
        isPermissionVisible: false
      });
      this.requestList();
    });
  }

  // 用户授权
  handleUserAuth = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: '信息',
        content: '未选中任何项目'
      });
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: this.state.selectedItem,
      // isAuthClosed: false,
    });
    this.getRoleUserList(this.state.selectedItem.id);
  }

  getRoleUserList = (id) => {
    Axios.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id: id
        }
      }
    }).then((res) => {
      this.getAuthUserList(res.result);
    });
  }

  // 筛选目标用户（status = 1）
  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
    }
    this.setState({ mockData, targetKeys });
  }

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys || [];
    data.role_id = this.state.selectedItem.id;
    Axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res) {
        this.setState({
          isUserVisible: false
        });
        this.requestList();
      }
    })
  }

  render () {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id',
      },
      {
        title: '角色名称',
        dataIndex: 'role_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formatDate
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '启用' : '停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formatDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name',
      },
    ]
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole} style={{ marginRight: 10 }}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission} style={{ marginRight: 10 }}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <BaseTable
            dataSource={this.state.list}
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisible: false
            });
          }}
        >
          <RoleForm wrappedComponentRef={(inst)=>this.roleForm = inst} />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermissionVisible}
          width={600}
          onOk={this.handlePermissionEdieSubmit}
          onCancel={() => {
            this.setState({
              isPermissionVisible: false
            });
          }}
        >
          <PermissionEditForm
            wrappedComponentRef={(inst) => this.permForm = inst }
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            });
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={(inst)=>this.userAuthForm=inst}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys: targetKeys
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}

// 角色创建
class RoleForm extends Component {

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      // 为输入控件设置布局样式
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('role_name', {
              initialValue: ''
            })(
              <Input tpye="text" placeholder="请输入角色名称" />
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('state', {
              initialValue: 1
            })(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}
RoleForm = Form.create({})(RoleForm);

// 设置权限
class PermissionEditForm extends Component {
  
  state = {};

  onCheck = (checkedKeys) => {
    // 将更改的checkedKeys传递回父组件
    this.props.patchMenuInfo(checkedKeys);
  }

  // 递归渲染全部权限
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode title={item.title} key={item.key} />
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={this.props.detailInfo.role_name} />
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: '1'
            })(
              <Select style={{ width: 80 }} placeholder="启用">
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
          checkedKeys={this.props.menuInfo || []}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }

}
PermissionEditForm = Form.create({})(PermissionEditForm);

class RoleAuthForm extends Component {

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称: " {...formItemLayout}>
          <Input disabled placeholder={this.props.detailInfo} />
        </FormItem>
        <FormItem label="选择用户: " {...formItemLayout}>
          <Transfer
            listStyle={{ width: 200, height: 400 }}
            dataSource={this.props.mockData}
            titles={['待选用户', '已选用户']}
            showSearch
            searchPlaceholder='输入用户名'
            filterOption={this.filterOption}
            // 显示在右侧框key值的集合
            targetKeys={this.props.targetKeys}
            // 用于修改父组件上的state.targetKeys
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm);