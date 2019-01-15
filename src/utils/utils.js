import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {

  // 日期格式化
  formatDate (time) {
    if (!time) {
      return '';
    }
    let date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
  },

  // pagination分页
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      // 显示数据总量和当前数据顺序
      showTotal: () => {
        return `共 ${data.result.total_count} 条`
      },
      // 是否快速跳转至某页
      showQuickJumper: true,
    }
  },

  // 创建<Option>标签列表
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = [];
    data.forEach((item) => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    });
    return options;
  },

  //  
  updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys: selectedRowKeys, 
        selectedItem: selectedItem, 
        selectedIds: selectedIds
      });
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem
      });
    }
  }
}