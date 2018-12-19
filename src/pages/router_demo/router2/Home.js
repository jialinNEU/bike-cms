import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topic">Topics</Link></li>
        </ul> 
        <hr />

        {/*匹配到的组件加载在这里*/}
        { this.props.children }
      </div>
    );
  }
}