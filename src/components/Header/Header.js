import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Utils from '../../utils/utils';
import axios from '../../axios';
import './style.less';

export default class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillMount () {
    this.setState({
      userName:'Eddie Gao'
    });
    setInterval(() => {
      let sysTime = Utils.formatDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);
  }

  getWeatherAPIDate () {
    axios.jsonp({
      // weather api url
      url: '',
    }).then((res) => {
      if (res.status === 'success') {
        // 需要根据api来确定
        let data = res.result[0].weather_data[0];
        this.setState({
          weather: data.weather
        })
      }
    });
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span>欢迎，{this.state.userName}</span>
            <a href="#/admin">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span="4" className="breadcrumb-title">
            首页
          </Col>
          <Col span="20" className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">晴转多云</span>
          </Col>
        </Row>
      </div>
    );
  }
}