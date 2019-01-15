import JsonP from 'jsonp';
import axios from 'axios';
import {
  Modal
} from 'antd';

export default class Axios {

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status === 'success') {
          resolve(response);
        } else {
          reject(response.message);
        }
      });
    });
  }

  // 封装 axios 请求
  static ajax(options) {
    // loading 拦截处理
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }

    let baseApi = "https://www.easy-mock.com/mock/5c1bb0dde09a456c978d20fb/mockapi";
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        // params随url一起发送?name1=params[name1]
        params: (options.data && options.data.params) || '',
        // data是作为请求主题被发送的数据
        // data: ...
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }

        if (response.status === 200) {
          if (response.data.code === 0) {
            resolve(response.data);
          } else {
            Modal.info({
              title: '提示',
              content: response.data.message,
            });
          }
        } else {
          reject(response.data);
        }
      })
    });

    /*
    static requestList(url, params, isMock) {
      let data = {
        params: params,
        isMock,
      };
      this.ajax({
        url,
        data,
      }).then((data) => {
        if (data && data.result) {
          let list = data.result.item_list.map((item, index) => {
            item.key = index;
            return item;
          });
          this.setState({
            // ...
          });
        }
      });
    }
  */
  }
}

/* api返回格式 */
/*
{
  "data": {
    "code": 0,
    "message": "",
    "result": {

    }
  }
}
*/