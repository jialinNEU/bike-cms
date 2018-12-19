import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Main from './../router1/Main';
import About from './../router1/About';
import Topic from './../router1/Topic';
import Home from './Home';

export default class HomeRouter extends React.Component {

  render() {
    return (
      <HashRouter>
        <Home>
          <Route path="/" render={()=>
            <Main>
              {/* 子路由 */}
              <Route path="/a" component={About}></Route>
            </Main>
          }></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topic" component={Topic}></Route>
        </Home>
      </HashRouter>
    );
  }
}