import React, { Component } from 'react';
import { Table } from 'antd';

import './style.less';

export default class BaseTable extends Component {
  
  state = {};

  // 行点击事件
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection === 'checkbox') {
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem || [];
      let selectedIds = this.props.selectedIds;
      // 已经有勾选的项目了
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i === -1) {
          // 勾选
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          // 取消勾选
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        // 第一次勾选项目
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
    } else {
      let selectedRowKeys = [index];
      let selectedItem = record;
      // 在state中存入selectedRowKey和selectedItem
      this.props.updateSelectedItem(selectedRowKeys, selectedItem);
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    let rowSelection = this.props.rowSelection;
    const selectedIds = [];
    if (rowSelection === 'checkbox') {
      selectedRows.forEach((item) => {
        selectedIds.push(item.id);
      });
      this.setState({
        selectedRowKeys,
        selectedIds,
        selectedItem: selectedRows[0]
      });
    }
    this.props.updateSelectedItem(selectedRowKeys, selectedRows[0], selectedIds);
  }

  onSelect = (record, selected, selectedRows) => {
    console.log('...');
  }

  onSelectAll = (selected, selectedRows, changeRows) => {
    let selectedIds = [];
    let selectKeys = [];
    selectedRows.forEach((item, index) => {
      selectedIds.push(item.id);
      selectKeys.push(index);
    });
    this.props.updateSelectedItem(selectKeys, selectedRows || {}, selectedIds);
  }

  getOptions = () => {

    const { selectedRowKeys } = this.props;
    const myRowSelection = {
      type: 'radio',
      // 和onChange一起使用
      selectedRowKeys,
      // 选中项发生变化时的回调
      onChange: this.onSelecteChange,
      // 用户手动选择/取消选择某行的回调
      onSelect: this.onSelect,
      // 用户手动选择/取消选择所有行的回调
      onSelectAll: this.onSelectAll
    };

    // 该变量用于判断是否有单选或复选列
    let rowSelection = this.props.rowSelection;
    // 没有单选或复选列
    if (rowSelection === false || rowSelection === null) {
      rowSelection = false;
    } else if (rowSelection === 'checkbox') {
      myRowSelection.type = 'checkbox';
    } else {
      rowSelection = 'radio';
    }

    return <Table
      bordered
      {...this.props}
      rowSelection={rowSelection ? myRowSelection : null}
      onRow={(record, index) => ({
        onClick: () => {
          if (!rowSelection) {
            return;
          }
          this.onRowClick(record, index);
        }
      })}
    />
  }

  render () {
    return (
      <div>
        {this.getOptions()}
      </div>
    );
  }
}