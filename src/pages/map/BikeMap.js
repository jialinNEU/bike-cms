import React, { Component } from 'react';
import { Card } from 'antd';

import { BaseForm } from './../../components/BaseForm';
import Axios from './../../axios/index';

export default class BikeMap extends Component {
  state = {};

  // 保存地图对象
  map = '';

  params = {
    page: 1
  };

  formList = [
    {
      type: '城市'
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '进行中'},
        {id: '2', name: '行程结束'}
      ]
    }
  ];

  componentDidMount () {
    this.requestList();
  }

  requestList = () => {
    Axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then((res) => {
      if(res.code === 0) {
        this.setState({
          total_count: res.result.total_count
        });
        this.renderMap(res);
      }
    });
  }

  // 渲染地图数据
  renderMap = (res) => {
    let list = res.result.route_list;
    this.map = new window.BMap.Map('container');
    // anchor表示控件的停靠位置
    this.map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    this.map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));

    let gps1 = list[0].split(',');
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
    this.map.centerAndZoom(endPoint, 11);

    let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      // 控制图标偏移量
      anchor: new window.BMap.Size(18, 42)
    });
    // marker是地图的覆盖物
    let bikeMarkerStart = new window.BMap.Marker(startPoint, {
      icon: startPointIcon
    });
    this.map.addOverlay(bikeMarkerStart);

    let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      // 控制图标偏移量
      anchor: new window.BMap.Size(18, 42)
    });
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {
      icon: endPointIcon
    });
    this.map.addOverlay(bikeMarkerEnd);

    // 绘制车辆行驶路线
    let routeList = [];
    list.forEach((item) => {
      let p = item.split(',');
      routeList.push(new window.BMap.Point(p[0], p[1]));
    });
    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyLine);

    // 绘制服务区域
    let servicePointList = [];
    let serviceList = res.result.service_list;
    serviceList.forEach((item) => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat));
    });
    let polyLineService = new window.BMap.Polyline(servicePointList, {
      strokeColor: '#ef4136',
      strokeWeight: 5,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyLineService);

    // 添加地图中的车辆图标
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)      
    });
    bikeList.forEach((item) => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      let bikeMarker = new window.BMap.Marker(point, {
        icon: bikeIcon
      });
      this.map.addOverlay(bikeMarker);
    });
  }

  // 查询表单
  handleFormSubmit = (params) => {
    this.params = params;
    this.requestList();
  }

  render () {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{height: 500}}></div>
        </Card>
      </div>
    );
  }
}