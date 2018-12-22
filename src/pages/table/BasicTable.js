import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd';

import Axios from './../../axios/index';
import Utils from './../../utils/utils';

export default class BasicTable extends Component {

  state = {};

  params = {
    page: 1,
  };

  componentDidMount () {
    const data = [
      {
        id: '0',
        username: 'Jack',
        sex: '1',
        state: '1',
        hobby: '1',
        birthday: '2000-01-01',
        address: '16 Island Hill Ave #208',
        time: '09:00',
      },
      {
        id: '1',
        username: 'Tom',
        sex: '1',
        state: '1',
        hobby: '1',
        birthday: '2008-08-08',
        address: '12 Island Hill Ave #105',
        time: '10:00',
      },
      {
        id: '2',
        username: 'Lily',
        sex: '2',
        state: '1',
        hobby: '1',
        birthday: '2012-09-10',
        address: '18 Island Hill Ave #302',
        time: '08:45',
      },
    ];
    data.forEach((item, index) => {
      item.key = index;
    });
    this.setState({
      dataSource: data,
    });
    this.request();
  }

  // 动态获取mock数据
  request = () => {
    let self = this;
    Axios.ajax({
      url: '/table/list',
      data: {
        params: {
          // state用来渲染dom结构，page不影响dom结构
          page: this.params.page,
        },
        // 设置为false，则不显示loading
        // isShowLoading: false,
      }
    }).then((res) => {
      if (res.code === 0) {
        res.result.list.forEach((item, index) => {
          item.key = index;
        });
        this.setState({
          dataSource2: res.result.list,
          selectedRowKeys: [],
          selectedRows: null,
          pagination: Utils.pagination(res, (current) => {
            self.params.page = current;
            this.request();
          }),
        });
      }
    })
  }

  onRowClick = (record, index) => {
    // 数组（可能为多选）
    let selectKey = [index];
    Modal.info({
      title: '信息',
      content: `用户名：${record.username}，爱好：${record.hobby}`,
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
    });
  }

  // 多选删除
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.forEach((item) => {
      ids.push(item.id);
    });
    Modal.confirm({
      title: '删除提示',
      content: `确定要删除吗? ${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    })
  }

  render () {
    const columns = [
      {
        key: 'id',
        // 表头显示内容
        title: 'ID',
        // 数据源的字段名称
        dataIndex: 'id',
      },
      {
        key: 'username',
        title: '用户名',
        dataIndex: 'username',
      },
      {
        key: 'sex',
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'  
        }
      },
      {
        key: 'state',
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': 'React',
            '2': 'Vue',
            '3': 'Angular',
            '4': 'FrontEnd',
            '5': 'BackEnd',
          }
          return config[state];
        }
      },
      {
        key: 'hobby',
        title: '爱好',
        dataIndex: 'hobby',
        render(hobby) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
          };
          return config[hobby];
        }
      },
      {
        key: 'birthday',
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        key: 'address',
        title: '地址',
        dataIndex: 'address',
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
      },
    ];

    const selectedRowKeys = this.state.selectedRowKeys;
    
    const rowSelection = {
      // 单选，多选为 'checkbox'
      type: 'radio',
      // 指定选中项的key数组，需要和onChange配合使用
      selectedRowKeys,
    };

    const rowChceckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    }

    return (
      <div>
        <Card title="基础表格">
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" style={{ margin: "10px 0" }}>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={true}
          />
        </Card>
        <Card title="Mock-单选" style={{ margin: "10px 0" }}>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={true}
            // 表格行是否可选择
            rowSelection={rowSelection}
            // 设置行属性
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              };
            }}
          />
        </Card>
        <Card title="Mock-单选" style={{ margin: "10px 0" }}>
          <div style={{marginBottom: 10}}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={true}
            rowSelection={rowChceckSelection}
          />
        </Card>
        <Card title="Mock-表格分页" style={{ margin: "10px 0" }}>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}