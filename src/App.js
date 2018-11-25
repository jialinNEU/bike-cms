import React, { Component } from 'react';

import { Button } from 'antd';

import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello World
        <Button type="primary">按钮</Button>
      </div>
    );
  }
}

export default App;
