import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

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

// Permission 权限管理
import { Permission } from './pages/permission';

export default class Router extends React.Component {
  
  render() {
    return (
      <HashRouter>
        <App>
            <Switch>
            <Route path="/login" component={Login} />
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            }
            />
            <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loadings" component={Loadings} />
                  <Route path="/ui/notifications" component={Notifications} />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/ui/tabs" component={Tab} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousels} />
                  <Route path="/form/login" component={FormLogin} />
                  <Route path="/form/reg" component={FormRegister} />
                  <Route path="/table/basic" component={BasicTable} />
                  <Route path="/table/adv" component={AdvTable} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/user" component={User} />
                  <Route path="/bikeMap" component={BikeMap} />
                  <Route path="/permission" component={Permission} />
                  <Redirect to="/home" />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            }/>
          </Switch>
        </App>
      </HashRouter>
    );
  }
}