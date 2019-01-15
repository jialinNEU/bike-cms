import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Admin from './admin';
import Common from './common';

// General
import { Home } from './pages//home';
import { Login } from './pages/login';
import { NoMatch } from './pages/nomatch';

// UI
import { Buttons } from './pages/ui/buttons';
import { Modals } from './pages/ui/modals';
import { Loadings } from './pages/ui/loadings';
import { Notifications } from './pages/ui/notifications';
import { Messages } from './pages/ui/messages';
import { Tab } from './pages/ui/tabs';
import { Gallery } from './pages/ui/gallery';
import { Carousels } from './pages/ui/carousels';

// Form
import { FormLogin, FormRegister } from './pages/form';
// Table
import { BasicTable, AdvTable } from './pages/table';

// City 城市管理
import { City } from './pages/city';

// Order 订单管理
import { Order, OrderDetail } from './pages/order';

// User 用户管理
import { User } from './pages/user';

// Map 地图模块
import { BikeMap } from './pages/map';

export default class Router extends React.Component {
  
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={()=>
            <Admin>
              <Switch>
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/ui/buttons" component={Buttons} />
                <Route path="/admin/ui/modals" component={Modals} />
                <Route path="/admin/ui/loadings" component={Loadings} />
                <Route path="/admin/ui/notifications" component={Notifications} />
                <Route path="/admin/ui/messages" component={Messages} />
                <Route path="/admin/ui/tabs" component={Tab} />
                <Route path="/admin/ui/gallery" component={Gallery} />
                <Route path="/admin/ui/carousel" component={Carousels} />
                <Route path="/admin/form/login" component={FormLogin} />
                <Route path="/admin/form/reg" component={FormRegister} />
                <Route path="/admin/table/basic" component={BasicTable} />
                <Route path="/admin/table/adv" component={AdvTable} />
                <Route path="/admin/city" component={City} />
                <Route path="/admin/order" component={Order} />
                <Route path="/admin/user" component={User} />
                <Route path="/admin/bikeMap" component={BikeMap} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          }/>
          <Route path="/common" render={() =>
            <Common>
              <Route path="/common/order/detail/:orderId" component={OrderDetail} />
            </Common>
          }
          />
        </App>
      </HashRouter>
    );
  }
}