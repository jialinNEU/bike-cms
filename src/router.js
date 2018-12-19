import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Admin from './admin';
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

export default class Router extends React.Component {
  
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/admin" render={()=>
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Buttons} />
                <Route path="/admin/ui/modals" component={Modals} />
                <Route path="/admin/ui/loadings" component={Loadings} />
                <Route path="/admin/ui/notifications" component={Notifications} />
                <Route path="/admin/ui/messages" component={Messages} />
                <Route path="/admin/ui/tabs" component={Tab} />
                <Route path="/admin/ui/gallery" component={Gallery} />
                <Route path="/admin/ui/carousel" component={Carousels} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          }/>
          <Route path="/login" component={Login} />
        </App>
      </HashRouter>
    );
  }
}