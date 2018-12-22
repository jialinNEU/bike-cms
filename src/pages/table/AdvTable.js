import React, { Component } from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';

import Axios from './../../axios/index';

export default class AdvTable extends Component {

  state = {};

  params = {
    page: 1,
  };

  componentDidMount () {
    this.request();
  }

  request = () => {
    // let self = this;
    Axios.ajax({
      url: '/table/adv/list',
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
          dataSource: res.result.list,
        });
      }
    });
  }

  // 分页、排序、降序变化时触发
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      // sorter结构
      /*
        column:
          dataIndex: "age"
          key: "age"
          sortOrder: "descend"
        sorter: ƒ sorter(a, b)
        title: "年龄"
        width: 80
        columnKey: "age"
        field: "age"
        order: "ascend" 
      */
      sortOrder: sorter.order
    });
  }

  handleDelete = (record) => {
    let id = record.id;
    Modal.confirm({
      title: '确认',
      content: `确认删除此条数据？${id}`,
      onOk: () => {
        message.success('删除成功！');
        this.request();
      }
    })
  }

  render () {
    // 头部固定
    const columns = [
      {
        key: 'id',
        // 表头显示内容
        title: 'ID',
        // 数据源的字段名称
        dataIndex: 'id',
        // 表头宽度
        width: 80,
      },
      {
        key: 'username',
        title: '用户名',
        dataIndex: 'username',
        width: 80,
      },
      {
        key: 'sex',
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'  
        },
        width: 80,
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
        },
        width: 80,
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
        },
        width: 80,
      },
      {
        key: 'birthday',
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
      },
      {
        key: 'address',
        title: '地址',
        dataIndex: 'address',
        width: 120,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
    ];

    // 左侧固定
    const columns2 = [
      {
        key: 'id',
        // 表头显示内容
        title: 'ID',
        // 数据源的字段名称
        dataIndex: 'id',
        // 表头宽度
        width: 80,
        // 左侧固定
        fixed: 'left',
      },
      {
        key: 'username',
        title: '用户名',
        dataIndex: 'username',
        width: 80,
        fixed: 'left',
      },
      {
        key: 'sex',
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'  
        },
        width: 80,
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
        },
        width: 80,
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
        },
        width: 80,
      },
      {
        key: 'birthday',
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
      },
      {
        key: 'address',
        title: '地址',
        dataIndex: 'address',
        width: 120,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
    ];

    // 排序
    const columns3 = [
      {
        key: 'id',
        // 表头显示内容
        title: 'ID',
        // 数据源的字段名称
        dataIndex: 'id',
        // 表头宽度
        width: 80,
      },
      {
        key: 'username',
        title: '用户名',
        dataIndex: 'username',
        width: 80,
      },
      {
        key: 'sex',
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'  
        },
        width: 80,
      },
      {
        key: 'age',
        title: '年龄',
        dataIndex: 'age',
        width: 80,
        // 排序
        sorter: (a, b) => {
          return a.age - b.age;
        },
        // 指定升序or降序
        sortOrder: this.state.sortOrder,
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
        },
        width: 80,
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
        },
        width: 80,
      },
      {
        key: 'birthday',
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
      },
      {
        key: 'address',
        title: '地址',
        dataIndex: 'address',
        width: 120,
      },
      {
        key: 'time',
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
      },
    ];

    const columns4 = [
      {
        // 表头显示内容
        title: 'ID',
        // 数据源的字段名称
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
          return sex === 1 ? '男' : '女'  
        },
      },
      {
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
        },
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        render(hobby) {
          let config = {
            '1': <Badge status="success" text="游泳" />,
            '2': <Badge status="error" text="打篮球" />,
            '3': <Badge status="default" text="踢足球" />,
            '4': <Badge status="processing" text="跑步" />,
            '5': <Badge status="warning" text="爬山" />,
          };
          return config[hobby];
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        // 当前行的值，当前行数据，行索引
        // (text, record, index) => {...}
        render: (text, record) => {
          return <Button size="small" onClick={(record) => this.handleDelete(record)}>删除</Button>;
        }
      }
    ];

    return (
      <div>
        <Card title="头部固定">
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            // 实现表格竖直方向滚动
            scroll={{ y: 240 }}
          />
        </Card>
        <Card title="左侧固定" style={{ margin: '10px 0' }}>
          <Table 
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            // 实现表格水平方向滚动，其值应略大于width总和（10）
            scroll={{ x: 1610 }}
          />
        </Card>
        <Card title="表格排序" style={{ margin: '10px 0' }}>
          <Table 
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="按钮操作" style={{ margin: '10px 0' }}>
          <Table 
            bordered
            columns={columns4}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}
