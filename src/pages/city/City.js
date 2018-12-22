import React, { Component } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';

import FilterForm from './FilterForm';
import OpenCityForm from './OpenCityForm';

import Axios from './../../axios/index';
import Utils from './../../utils/utils';

export default class City extends Component {

  state = {
    list: [],
    isShowOpenCity: false,
  };

  params = {
    page: 1
  };

  componentDidMount () {
    this.requestList();
  }

  requestList = () => {
    let self = this;
    Axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page,
        },
      },
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
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

  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true,
    });
  }

  // 城市开通提交
  handleSubmit = () => {
    // 保存在wrapperComponentRef下
    let cityInfo = this.cityForm.props.form.getFieldValues();
    Axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo,
      },
    }).then((res) => {
      if(res.code === 0) {
        message.success('开通成功');
        this.setState({
          isShowOpenCity: false
        });
        this.requestList();
      }
    })
  }

  render () {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id',
      },
      {
        title: '城市名称',
        dataIndex: 'name',
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode === 1 ? '停车点' : '禁停区';
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode === 1 ? '自营' : '加盟';
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name',
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name
          }).join(',');
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time',
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render(time) {
          return Utils.formatDate(time);
        }
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name',
      },
    ];

    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false,
            });
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(form) => {this.cityForm = form}} />
        </Modal>
      </div>
    );
  }
}